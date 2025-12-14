'use client'
import { useQuery } from "convex/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { CircleQuestionMark, Hash, LayoutTemplate, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useAppSelector } from "@/redux/store";
import CreateProject from "../buttons/project";

type TabsProps = {
    label: string
    href: string
    icon?: React.ReactNode
}

const Navbar = () => {
    const params = useSearchParams()
    const projectId = params.get('project')
    const pathname = usePathname()
    //add credit logic 
    const me = useAppSelector((state) => state.profile)

    // Extract session from pathname (e.g., /dashboard/[session]/canvas -> [session])
    const pathSegments = pathname.split('/').filter(Boolean)
    const session = pathSegments[1] || pathSegments[0] // Get session from /dashboard/[session] or fallback

    const tabs: TabsProps[] = [
        {
            label: "Canvas",
            href: `/dashboard/${session}/canvas${projectId ? `?project=${projectId}` : ''}`,
            icon: <Hash className="h-4 w-4" />,
        },
        {
            label: " Style Guide ",
            href: `/dashboard/${session}/style-guide${projectId ? `?project=${projectId}` : ''}`,
            icon: <LayoutTemplate className="h-4 w-4" />
        },
    ];



    const project = useQuery(
        api.projects.getProject,
        projectId ? { projectId: projectId as Id<'projects'> } : 'skip'
    )
    const hasCanvas = pathname.includes('canvas')
    const hasStyleGuide = pathname.includes('style-guide')
    return <div className="grid grid-cols-2 lg:grid-cols-3 p-6 fixed top-0 left-0 right-0
    z-50">
        <div className="flex items-center gap-4">
            <Link
                href={`/dashboard/${me.name}`}
                className="w-8 h-8 rounded-full border-3 border-white bg-black flex
            items-center justify-center"
            >
                <div className="w-4 h-4 rounded-full bg-white"></div>
            </Link>
            {!hasCanvas ||
                (!hasStyleGuide && (
                    <div className="lg:inline-block hidden rounded-full text-primary/60 border
                border-white/[0.12] backdrop-blur-xl bg-white/[0.08] px-4 py-2 text-sm
                saturate-150">
                        {project?.name}
                    </div>
                ))}
        </div>
        <div className="lg:flex hidden items-center justify-center gap-2">
            <div className="flex items-center gap-2 backdrop-blur-xl bg-white/[0.08] border
            border-white/[0.12] rounded-full p-2 saturate-150">
                {tabs.map((t) => {
                    const isActive = `${pathname}?project=${projectId}` === t.href;
                    return (
                        <Link
                            key={t.href}
                            href={t.href}
                            className={cn(
                                'group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition',
                                isActive
                                    ? 'bg-white/[0.12] text-white border border-white/[0.16] backdrop-blur-sm'
                                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06] border border-transparent'
                            )}
                        >
                            <span className={cn(
                                isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-90'
                            )}>
                                {t.icon}
                            </span>
                            <span>{t.label}</span>
                        </Link>
                    );
                })}
            </div>
            <div className="flex items-center gap-4 justify-end">
                <span className="text-sm text-white/50">credits</span>
                <button
                    type="button"
                    className="rounded-full h-12 w-12 flex items-center justify-center 
                backdrop-blur-xl bg-white/[0.08] border border-white/[0.12] saturate-150
                hover:bg-white/[0.12]"
                >
                    <CircleQuestionMark className="size-5 text-white" />
                </button>
                <Avatar className="size-12 ml-2">
                    <AvatarImage src={me.image || ''} />
                    <AvatarFallback>
                        <User className="size-5 text-black" />

                    </AvatarFallback>
                </Avatar>
                {!hasCanvas && !hasStyleGuide && <CreateProject />}
            </div>
        </div>
    </div>

}

export default Navbar