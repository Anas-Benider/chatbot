import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { AlertCircleIcon, BotIcon, Loader2Icon, SendIcon, UserIcon, XIcon } from "lucide-react"
import { ScrollArea } from "../ui/scroll-area"
import { Avatar } from "../ui/avatar"
import { Input } from "../ui/input"
import { cn } from "@/lib/utils"

export default function ChatPopup({ onClose }) {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const [hasProcessedDocument, setHasProcessedDocument] = useState(false)
    const [isCheckingDocument, setIsCheckingDocument] = useState(true)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        const checkDocument = async () => {
            try {
                setIsCheckingDocument(true)
                const hasDocument = await checkProcessedDocument()
                setHasProcessedDocument(hasDocument)

                // Message initial en fonction de l'état du document traité
                const initialMessage = {
                    id: "1",
                    content: hasDocument
                        ? "Bonjour ! Je suis votre assistant virtuel Cnexia. Comment puis-je vous aider aujourd'hui ?"
                        : "Bonjour ! Pour pouvoir répondre à vos questions, j'ai besoin qu'un document soit traité. Veuillez demander à un administrateur de traiter un document PDF pour le chatbot.",
                    sender: "bot",
                    timestamp: new Date(),
                }

                setMessages([initialMessage])
            } catch (error) {
                console.error("Erreur lors de la vérification du document traité:", error)
                setHasProcessedDocument(false)

                // Message d'erreur
                const errorMessage = {
                    id: "1",
                    content: "Désolé, je ne peux pas vérifier si un document a été traité. Veuillez réessayer plus tard.",
                    sender: "bot",
                    timestamp: new Date(),
                    isError: true,
                }

                setMessages([errorMessage])
            } finally {
                setIsCheckingDocument(false)
            }
        }

        checkDocument()
    }, [])

    const handleSendMessage = async (e) => {
        e.preventDefault()

        if (!input.trim() || isTyping || !hasProcessedDocument) return

        // Add user message
        const userMessage = {
            id: Date.now().toString(),
            content: input,
            sender: "user",
            timestamp: new Date(),
        }

        // Add loading message
        const loadingMessage = {
            id: `loading-${Date.now().toString()}`,
            content: "",
            sender: "bot",
            timestamp: new Date(),
            isLoading: true,
        }

        setMessages((prev) => [...prev, userMessage, loadingMessage])
        setInput("")
        setIsTyping(true)

        try {
            // Demander au chatbot
            const response = await askQuestion(input)

            // Remplacer le message de chargement par la réponse
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.isLoading
                        ? {
                            id: Date.now().toString(),
                            content: response,
                            sender: "bot",
                            timestamp: new Date(),
                        }
                        : msg,
                ),
            )
        } catch (error) {
            // Remplacer le message de chargement par un message d'erreur
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.isLoading
                        ? {
                            id: Date.now().toString(),
                            content: "Désolé, je n'ai pas pu traiter votre demande. Veuillez réessayer.",
                            sender: "bot",
                            timestamp: new Date(),
                            isError: true,
                        }
                        : msg,
                ),
            )

            toast({
                title: "Erreur",
                description: "Impossible de communiquer avec le chatbot",
                variant: "destructive",
            })
        } finally {
            setIsTyping(false)
        }
    }

    return (
        <Card className="fixed bottom-4 right-4 !py-0 w-80 md:w-96 shadow-lg z-50 border-green-200">
            <CardHeader className="py-4 px-4 flex flex-row items-center justify-between space-y-0 border-b rounded-t-2xl bg-green-50">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <BotIcon />
                    Assistant Cnexia
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 hover:bg-green-100 hover:cursor-pointer">
                    <XIcon className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="p-0">
                <ScrollArea className="h-[350px] p-4">
                    {isCheckingDocument ? (
                        <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground">
                            <Loader2Icon className="h-8 w-8 animate-spin text-green-500" />
                            <p>Initialisation de l'assistant...</p>
                        </div>
                    ) : (
                        messages.map((message) => (
                            <div
                                key={message.id}
                                className={cn(`flex items-start gap-2 mb-4`, message.sender === "user" ? "justify-end" : "justify-start")}
                            >
                                {message.sender === "bot" && (
                                    <Avatar className={cn(`h-8 w-8 flex justify-center items-center`, message.isError ? "bg-red-100" : "bg-green-100")}>
                                        {message.isError ? (
                                            <AlertCircleIcon className="h-5 w-5 text-red-600" />
                                        ) : (
                                            <BotIcon className="h-5 w-5 text-green-600" />
                                        )}
                                    </Avatar>
                                )}
                                <div
                                    className={cn(`px-3 py-2 rounded-lg max-w-[80%]`,
                                        message.sender === "user"
                                            ? "bg-green-600 text-white"
                                            : message.isError
                                                ? "bg-red-50 text-red-800 border border-red-200"
                                                : "bg-muted"
                                    )}
                                >
                                    {message.isLoading ? (
                                        <div className="flex gap-1 py-1">
                                            <span
                                                className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
                                                style={{ animationDelay: "0ms" }}
                                            ></span>
                                            <span
                                                className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
                                                style={{ animationDelay: "150ms" }}
                                            ></span>
                                            <span
                                                className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
                                                style={{ animationDelay: "300ms" }}
                                            ></span>
                                        </div>
                                    ) : (
                                        <>
                                            <p className="text-sm">{message.content}</p>
                                            <p className="text-xs opacity-70 mt-1">
                                                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                            </p>
                                        </>
                                    )}
                                </div>
                                {message.sender === "user" && (
                                    <Avatar className="h-8 w-8 flex justify-center items-center bg-green-600">
                                        <UserIcon className="h-5 w-5" />
                                    </Avatar>
                                )}
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </ScrollArea>
            </CardContent>
            <CardFooter className="p-3 border-t">
                <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                    <Input
                        placeholder={hasProcessedDocument ? "Tapez votre message..." : "Chatbot non disponible..."}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 border-green-200 focus-visible:ring-green-500"
                        disabled={!hasProcessedDocument || isTyping}
                    />
                    <Button type="submit" className={'hover:cursor-pointer bg-green-700 disabled:bg-slate-500'} disabled={!input.trim() || isTyping || !hasProcessedDocument} size="icon" >
                        {isTyping ? <Loader2Icon className="h-4 w-4 animate-spin" /> : <SendIcon className="h-4 w-4" />}
                    </Button>
                </form>
            </CardFooter>
        </Card>
    )
}
