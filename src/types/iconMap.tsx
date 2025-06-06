import {
	Github,
	Instagram,
	Linkedin,
	Twitter,
	Globe,
} from "lucide-react";

export const iconMap: Record<string, React.ReactNode> = {
	github: <Github className="inline-block w-5 pr-1" />,
	instagram: <Instagram className="inline-block w-5 pr-1 text-pink-500" />,
	linkedin: <Linkedin className="inline-block w-5 pr-1 text-blue-500" />,
	twitter: <Twitter className="inline-block w-5 pr-1" />,
	website: <Globe className="inline-block w-5 pr-1" />,
};

