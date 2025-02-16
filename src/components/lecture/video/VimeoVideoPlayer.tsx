"use client";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { VimeoVideo } from "./VimeoVideo";

//const VimeoVideo = dynamic(() => import("./VimeoVideo"), { ssr: false });

export const VimeoVideoPlayer: React.FC<{ src: any; slug: string }> = ({
  src,
  slug,
}) => {
  //const { slug } = useParams();
  const searchParams = useSearchParams();
  let phase = searchParams.get("phase") || "intro";

  let videoId = src[phase] || src.intro;
  if (!videoId || !videoId.startsWith("https://vimeo.com/")) {
    phase = "main";
    videoId = src[phase];
  }

  if (!videoId) return null;

  return (
    <>
      <VimeoVideo
        //ref
        key={`${videoId}`}
        videoId={videoId}
        slug={slug}
        phase={phase}
      />
    </>
  );
};
