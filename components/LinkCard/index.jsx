import React from "react";
import ArrowIcon from "@/public/icon-arrow-right.svg";
import GithubIcon from "@/public/icon-github.svg?url";
import MentorIcon from "@/public/icon-frontend-mentor.svg?url";
import TwitterIcon from "@/public/icon-twitter.svg?url";
import LinkedlnIcon from "@/public/icon-linkedin.svg?url";
import YoutubeIcon from "@/public/icon-youtube.svg?url";
import FacebookIcon from "@/public/icon-facebook.svg?url";
import TwitchIcon from "@/public/icon-twitch.svg?url";
import DevtoIcon from "@/public/icon-devto.svg?url";
import CodewarsIcon from "@/public/icon-codewars.svg?url";
import CodepenIcon from "@/public/icon-codepen.svg?url";
import FreeCodeIcon from "@/public/icon-freecodecamp.svg?url";
import GitlabIcon from "@/public/icon-gitlab.svg?url";
import HashnodeIcon from "@/public/icon-hashnode.svg?url";
import StackOverflowIcon from "@/public/icon-stack-overflow.svg?url";
import Image from "next/image";

export default function LinkCard({ link }) {
  const { platform, url } = link;

  const correctedUrl =
    url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;

  let Icon;
  switch (platform.toLowerCase()) {
    case "github":
      Icon = GithubIcon;
      break;
    case "mentor":
      Icon = MentorIcon;
      break;
    case "twitter":
      Icon = TwitterIcon;
      break;
    case "linkedin":
      Icon = LinkedlnIcon;
      break;
    case "youtube":
      Icon = YoutubeIcon;
      break;
    case "facebook":
      Icon = FacebookIcon;
      break;
    case "twitch":
      Icon = TwitchIcon;
      break;
    case "devto":
      Icon = DevtoIcon;
      break;
    case "codewars":
      Icon = CodewarsIcon;
      break;
    case "codepen":
      Icon = CodepenIcon;
      break;
    case "freecodecamp":
      Icon = FreeCodeIcon;
      break;
    case "gitlab":
      Icon = GitlabIcon;
      break;
    case "hashnode":
      Icon = HashnodeIcon;
      break;
    case "stack-overflow":
      Icon = StackOverflowIcon;
      break;
    default:
      Icon = null;
      break;
  }

  return (
    <a
      className="h-11 w-full px-4 py-[11px] inline-flex justify-between items-center bg-black text-white rounded-lg"
      href={correctedUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex items-center gap-2">
        {Icon && <Image src={Icon} alt={platform} width={16} height={16} />}
        <h3 className="text-[12px] font-normal text-white capitalize">
          {platform}
        </h3>
      </div>
      <ArrowIcon />
    </a>
  );
}
