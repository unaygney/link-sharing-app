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
  let BackgroundColor;
  switch (platform.toLowerCase()) {
    case "github":
      Icon = GithubIcon;
      BackgroundColor = "bg-[#1A1A1A]";
      break;
    case "frontend-mentor":
      Icon = MentorIcon;
      BackgroundColor = "bg-[#D9D9D9]";
      break;
    case "twitter":
      Icon = TwitterIcon;
      BackgroundColor = "bg-[#43B7E9]";
      break;
    case "linkedln":
      Icon = LinkedlnIcon;
      BackgroundColor = "bg-[#2D68FF]";
      break;
    case "youtube":
      Icon = YoutubeIcon;
      BackgroundColor = "bg-[#EE3939]";
      break;
    case "facebook":
      Icon = FacebookIcon;
      BackgroundColor = "bg-[#2442AC]";
      break;
    case "twitch":
      Icon = TwitchIcon;
      BackgroundColor = "bg-[#EE3FC8]";
      break;
    case "dev-to":
      Icon = DevtoIcon;
      BackgroundColor = "bg-[#333333]";
      break;
    case "codewars":
      Icon = CodewarsIcon;
      BackgroundColor = "bg-[#8A1A50]";
      break;
    case "codepen":
      Icon = CodepenIcon;
      BackgroundColor = "bg-[#2442AC]";
      break;
    case "free-code-camp":
      Icon = FreeCodeIcon;
      BackgroundColor = "bg-[#302267]";
      break;
    case "gitlab":
      Icon = GitlabIcon;
      BackgroundColor = "bg-[#EB4925]";
      break;
    case "hashnode":
      Icon = HashnodeIcon;
      BackgroundColor = "bg-[#0330D1]";
      break;
    case "stack-overflow":
      Icon = StackOverflowIcon;
      BackgroundColor = "bg-[#EC7100]";
      break;
    default:
      Icon = null;
      BackgroundColor = null;
      break;
  }

  return (
    <a
      className={`h-11 w-full px-4 py-[11px] inline-flex justify-between items-center ${BackgroundColor} text-white rounded-lg`}
      href={correctedUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex items-center gap-2">
        {Icon && <Image src={Icon} alt={platform} width={16} height={16} />}
        <h3 className="text-base  font-normal text-white capitalize">
          {platform}
        </h3>
      </div>
      <ArrowIcon />
    </a>
  );
}
