import { useState } from "react"
import { Link } from "react-router"
import { Button } from "./components/ui/button"
import { FileTextIcon, HomeIcon, UploadIcon } from "lucide-react"
import { cn } from "./lib/utils"

export default function HrPage() {
  const [activeTab, setActiveTab] = useState("upload")

  return (
    <div className="w-full px-10 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-cnexia-800">Espace RH</h1>
        <Link to="/">
          <Button variant="outline" size="sm">
            <HomeIcon className="w-4 h-4 mr-2" />
            Accueil
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg border shadow-sm p-4 sticky top-24">
            <div className="space-y-1">
              <Button
                className={ cn(
                  "w-full justify-start hover:cursor-pointer",
                  activeTab == "upload" && "bg-green-600 text-white"
                ) }
                variant={"ghost"}
                onClick={() => setActiveTab("upload")}
              >
                <UploadIcon className="mr-2 h-4 w-4" />
                Télécharger
              </Button>
              <Button
                className={ cn(
                  "w-full justify-start hover:cursor-pointer",
                  activeTab == "documents" && "bg-green-600 text-white"
                ) }
                variant={"ghost"}
                onClick={() => setActiveTab("documents")}
              >
                <FileTextIcon className="mr-2 h-4 w-4" />
                Documents
              </Button>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="bg-white rounded-lg border shadow-sm p-6">
            {activeTab === "upload" && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-cnexia-700">Télécharger des documents</h2>
                <p className="text-muted-foreground">Ajoutez de nouveaux documents pour les utilisateurs.</p>
                {/* <DocumentUpload onSuccess={() => setActiveTab("documents")} /> */}
              </div>
            )}

            {activeTab === "documents" && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-cnexia-700">Espace documents</h2>
                <p className="text-muted-foreground">Gérez tous les documents disponibles.</p>
                {/* <DocumentList isHR={true} /> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
