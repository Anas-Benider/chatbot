import { Outlet } from "react-router";

export default function Layout() {
    return (
        <>
            <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="w-full pr-10 pl-4 flex items-center justify-between h-16">
                    <img src="/cnexia-No-bg.png" className="size-18" alt="" />
                    <nav className="flex items-center gap-4">
                        <a
                            href="/"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Accueil
                        </a>
                        <a
                            href="/hr"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Espace RH
                        </a>
                        <a
                            href="/user"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Espace Utilisateur
                        </a>
                    </nav>
                </div>
            </header>
            <main className="min-h-[calc(100vh-4rem)] bg-background">
                <Outlet/>
            </main>
            <footer className="border-t py-6 bg-muted/30">
                <div className="w-full px-10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">© 2025 Cnexia. Tous droits réservés.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                            Politique de confidentialité
                        </a>
                        <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                            Conditions d'utilisation
                        </a>
                        <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                            Contact
                        </a>
                    </div>
                </div>
            </footer>
        </>
    )
}
