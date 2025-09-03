import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { router } from '@inertiajs/react'
import { ArrowLeft } from "lucide-react";

export default function Header({ title }: { title: string }) {
    return (
        <header className="bg-card border-b border-border shadow-soft">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.visit('/dashboard')}
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <Logo />
                    <div className="ml-auto">
                        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
                    </div>
                </div>
            </div>
        </header>
    )
}