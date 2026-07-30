import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RTE, Select, Input, Button } from "../index";
import appwriteService from "../../appwrite/configuration";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    try {
      const { image, ...postFields } = data; // strip the raw FileList out — never send this to Appwrite

      if (post) {
        const file = image?.[0]
          ? await appwriteService.uploadFile(image[0])
          : null;

        if (file) {
          await appwriteService.deleteFile(post.featuredimage);
        }

        const updatedPost = await appwriteService.updatePost(post.$id, {
          ...postFields,
          featuredimage: file ? file.$id : post.featuredimage,
        });

        if (updatedPost) {
          navigate(`/post/${updatedPost.$id}`);
        }
      } else {
        const file = await appwriteService.uploadFile(image[0]);

        if (file) {
          const dbPost = await appwriteService.createPost({
            ...postFields,
            featuredimage: file.$id,
            userId: userData.$id,
          });

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.error("Post submit failed:", error);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          placeholder="Title"
          className="mb-4 font-light text-[13px] border border-gray-200"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <p className="text-red-500 text-xs -mt-3 mb-3">
            {errors.title.message}
          </p>
        )}

        <Input
          placeholder="Slug"
          className="mb-4 px-2 text-[13px] font-light border border-gray-200"
          {...register("slug", { required: "Slug is required" })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        {errors.slug && (
          <p className="text-red-500 text-xs -mt-3 mb-3">
            {errors.slug.message}
          </p>
        )}

        <RTE
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 text-[15px] text-start font-light">
        <Input
          label="Featured Image"
          type="file"
          className="mb-4 text-[13px] font-light bg-white rounded-xl"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", {
            required: post ? false : "Featured image is required",
          })}
        />
        {errors.image && (
          <p className="text-red-500 text-xs -mt-3 mb-3">
            {errors.image.message}
          </p>
        )}
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredimage)}
              alt={post.title}
              className="rounded-2xl"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full text-[15px]"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
