import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BotIcon, DownloadIcon, EyeIcon, FileTextIcon, Loader2Icon, SearchIcon, TrashIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function DocumentList({isHR}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [processingDocument, setProcessingDocument] = useState(null)
  const [documentToDelete, setDocumentToDelete] = useState(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true)
        //todo: create the getDocuments fc
        //const docs = await getDocuments()
        const docs = [{
            id: 33243,
            type: "pdf",
            title: "test pdf file",
            status: "restricted",
            category: "CRM",
            date: "22-05-2010",
            size: "22mb"
        },
        {
            id: 343,
            type: "docx",
            title: "test docx file",
            status: "",
            category: "CRM",
            date: "22-05-2015",
            size: "1mb"
        }
    ]
        setDocuments(docs)
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de récupérer les documents",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDocuments()
  }, [toast, refreshTrigger])

  const handleDeleteDocument = async (id) => {
    try {
      await deleteDocument(id)
      setDocuments(documents.filter((doc) => doc.id !== id))
      toast({
        title: "Succès",
        description: "Document supprimé avec succès",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le document",
        variant: "destructive",
      })
    } finally {
      setDocumentToDelete(null)
    }
  }

  const handleProcessDocument = async (id) => {
    try {
      setProcessingDocument(id)
      await processDocumentForChatbot(id)
      toast({
        title: "Succès",
        description: "Document traité avec succès pour le chatbot",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de traiter le document pour le chatbot",
        variant: "destructive",
      })
    } finally {
      setProcessingDocument(null)
    }
  }

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <FileTextIcon className="h-4 w-4 text-red-500" />
      case "docx":
      case "doc":
        return <FileTextIcon className="h-4 w-4 text-blue-500" />
      case "xlsx":
      case "xls":
        return <FileTextIcon className="h-4 w-4 text-green-500" />
      case "pptx":
      case "ppt":
        return <FileTextIcon className="h-4 w-4 text-orange-500" />
      default:
        return <FileIcon className="h-4 w-4" />
    }
  }

  return (
    <>
      <Card className="border-green-100">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un document..."
                className="pl-9 border-green-200 focus-visible:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {isHR && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRefreshTrigger((prev) => prev + 1)}
                className="flex items-center gap-1"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21 3V8M21 8H16M21 8C18.2386 8 16 10.2386 16 13C16 15.7614 13.7614 18 11 18C8.23858 18 6 15.7614 6 13C6 10.2386 3.76142 8 1 8H3M1 8V3M1 8H6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Actualiser
              </Button>
            )}
          </div>

          {loading ? (
            <div className="py-12 text-center text-muted-foreground flex flex-col items-center gap-2">
              <Loader2Icon className="h-8 w-8 animate-spin text-green-500" />
              <p>Chargement des documents...</p>
            </div>
          ) : filteredDocuments.length > 0 ? (
            <div className="border rounded-md border-green-100">
              <Table>
                <TableHeader>
                  <TableRow className="bg-green-50/50">
                    <TableHead>Titre</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Taille</TableHead>
                    <TableHead className="flex justify-end items-center">
                        <span className="pr-14">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id} className="hover:bg-green-50/30">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {getFileIcon(doc.type)}
                          <span>{doc.title}</span>
                          {doc.status === "restricted" && (
                            <Badge
                              variant="outline"
                              className="ml-2 bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                            >
                              Restreint
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{doc.category}</TableCell>
                      <TableCell>{doc.date}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Visualiser"
                            className="hover:text-green-700 hover:bg-green-50"
                            onClick={() => window.open(getDocumentViewUrl(doc.id), "_blank")}
                          >
                            <EyeIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Télécharger"
                            className="hover:text-green-700 hover:bg-green-50"
                            onClick={() => window.open(getDocumentDownloadUrl(doc.id), "_blank")}
                          >
                            <DownloadIcon className="h-4 w-4" />
                          </Button>
                          {doc.type.toLowerCase() === "pdf" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Traitement pour chatbot"
                              className="hover:text-green-700 hover:bg-green-50"
                              onClick={() => handleProcessDocument(doc.id)}
                              disabled={processingDocument === doc.id}
                            >
                              {processingDocument === doc.id ? (
                                <Loader2Icon className="h-4 w-4 animate-spin" />
                              ) : (
                                <BotIcon className="h-4 w-4 text-green-600" />
                              )}
                            </Button>
                          )}
                          {isHR && (
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Supprimer"
                              className="hover:text-red-700 hover:bg-red-50"
                              onClick={() => setDocumentToDelete(doc.id)}
                            >
                              <TrashIcon className="h-4 w-4 text-red-500" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="py-12 text-center text-muted-foreground">Aucun document trouvé.</div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={documentToDelete !== null} onOpenChange={(open) => !open && setDocumentToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce document ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Le document sera définitivement supprimé.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={() => documentToDelete && handleDeleteDocument(documentToDelete)}
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
