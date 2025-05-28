import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircleIcon, FileIcon, UploadIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from "sonner"

export default function DocumentUpload() {
    const [isUploading, setIsUploading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [fileName, setFileName] = useState("")
    const [dragActive, setDragActive] = useState(false)
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [visibility, setVisibility] = useState("public")
    const [file, setFile] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!file) {
            toast({
                title: "Erreur",
                description: "Veuillez sélectionner un fichier",
                variant: "destructive",
            })
            return
        }

        setIsUploading(true)

        try {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("category", category)
            formData.append("description", description || "")
            formData.append("status", visibility)
            formData.append("file", file)

            await uploadDocument(formData)

            setIsSuccess(true)
            toast({
                title: "Succès",
                description: "Document téléchargé avec succès",
            })

            // Reset form after success
            setTimeout(() => {
                setIsSuccess(false)
                setFileName("")
                setTitle("")
                setCategory("")
                setDescription("")
                setVisibility("public")
                setFile(null)
                onSuccess()
            }, 2000)
        } catch (error) {
            toast({
                title: "Erreur",
                description: error instanceof Error ? error.message : "Erreur lors du téléchargement du document",
                variant: "destructive",
            })
        } finally {
            setIsUploading(false)
        }
    }

    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0]
            setFileName(droppedFile.name)
            setFile(droppedFile)
        }
    }

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0]
            setFileName(selectedFile.name)
            setFile(selectedFile)
        }
    }

    return (
        <Card className="border-green-100">
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Titre du document</Label>
                        <Input
                            id="title"
                            placeholder="Entrez le titre du document"
                            required
                            className="border-green-200 focus-visible:ring-green-500"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Catégorie</Label>
                        <Select required value={category} onValueChange={setCategory}>
                            <SelectTrigger className="border-green-200 focus-visible:ring-green-500 w-full">
                                <SelectValue placeholder="Sélectionnez une catégorie" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Administrative">Documents administratifs</SelectItem>
                                <SelectItem value="Payroll">Fiches de paie</SelectItem>
                                <SelectItem value="Contract">Contrats</SelectItem>
                                <SelectItem value="Training">Formations</SelectItem>
                                <SelectItem value="Other">Autres</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Décrivez le contenu du document"
                            rows={3}
                            className="border-green-200 focus-visible:ring-green-500"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="file">Fichier</Label>
                        <div
                            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${dragActive ? "border-green-500 bg-green-50" : "border-green-200 hover:border-green-300"
                                }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <input id="file" type="file" className="hidden" onChange={handleFileChange} required />
                            <label htmlFor="file" className="cursor-pointer flex flex-col items-center gap-2">
                                <FileIcon className="h-10 w-10 text-green-500" />
                                <div className="text-sm font-medium">
                                    {fileName ? (
                                        <span className="text-green-700">{fileName}</span>
                                    ) : (
                                        <>
                                            <span className="text-green-600">Cliquez pour sélectionner</span> ou glissez-déposez
                                        </>
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground">PDF, DOCX, XLSX, PPTX jusqu'à 10MB</p>
                            </label>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="visibility">Visibilité</Label>
                        <Select value={visibility} onValueChange={setVisibility} required>
                            <SelectTrigger className="border-green-200 focus-visible:ring-green-500 w-full">
                                <SelectValue placeholder="Sélectionnez la visibilité" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="public">Tous les utilisateurs</SelectItem>
                                <SelectItem value="restricted">Utilisateurs spécifiques</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button type="submit" className="w-full bg-green-600" disabled={isUploading || isSuccess}>
                        {isUploading ? (
                            <span className="flex items-center gap-2">
                                <UploadIcon className="w-4 h-4 animate-bounce" />
                                Téléchargement en cours...
                            </span>
                        ) : isSuccess ? (
                            <span className="flex items-center gap-2">
                                <CheckCircleIcon className="w-4 h-4 text-white" />
                                Document téléchargé avec succès!
                            </span>
                        ) : (
                            <span className="flex items-center gap-2 hover:cursor-pointer">
                                <UploadIcon className="w-4 h-4" />
                                Télécharger le document
                            </span>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
