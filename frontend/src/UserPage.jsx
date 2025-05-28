import { useState } from "react"
import { Button } from "./components/ui/button"
import { BellIcon, HomeIcon, MessageCircleIcon, UserIcon } from "lucide-react"
import { Link } from "react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Avatar } from "./components/ui/avatar"
import DocumentList from "./components/features/documentList"
import ChatPopup from "./components/features/chatPopup"

export default function UserPage() {
 const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <div className="w-full px-10 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-cnexia-800">Espace Utilisateur</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setIsChatOpen(!isChatOpen)} className="relative">
            <MessageCircleIcon className="w-5 h-5" />
            {!isChatOpen && <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>}
          </Button>
          <Button variant="outline" size="icon" className="relative">
            <BellIcon className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-cnexia-500 rounded-full"></span>
          </Button>
          <Link to="/">
            <Button variant="outline" size="sm">
              <HomeIcon className="w-4 h-4 mr-2" />
              Accueil
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <Card className="border-cnexia-100">
            <CardHeader className="pb-3">
              <div className="flex justify-center">
                <Avatar className="h-20 w-20 flex items-center justify-center bg-green-100">
                  <UserIcon className="h-10 w-10" />
                </Avatar>
              </div>
              <CardTitle className="text-center mt-2">Anas Benider</CardTitle>
              <CardDescription className="text-center">Full Stack Software Developer Intern IT</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Email</div>
                  <div className="text-sm">anas.benider@cnexia.com</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Téléphone</div>
                  <div className="text-sm">+33 6 12 34 56 78</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Département</div>
                  <div className="text-sm">IT</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <h2 className="text-xl font-semibold text-cnexia-700 mb-4">Mes documents</h2>
            <DocumentList isHR={false} />
          </div>
        </div>
      </div>

      {isChatOpen && <ChatPopup onClose={() => setIsChatOpen(false)} />}
    </div>
  )
}
