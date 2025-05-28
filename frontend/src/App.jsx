import { Link } from "react-router"
import { Button } from "./components/ui/button"
import { CheckCircleIcon, FileTextIcon, UserIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"

function App() {

  return (
    <>
      <div className="relative w-full">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 z-0"></div>
          <div className="absolute inset-0 bg-grid-green z-10 opacity-10"></div>
          <div className="w-full bg-green-100 relative z-20 pt-20 pb-24 px-10 md:pt-32 md:pb-40">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Bienvenue sur le portail <span className="text-green-600">Cnexia</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-md">
                  Accédez à vos documents et bénéficiez d'une assistance personnalisée en quelques clics.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/user">
                    <Button size="lg" className="w-full sm:w-auto bg-green-600">
                      Espace Utilisateur
                    </Button>
                  </Link>
                  <Link to="/hr">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Espace Admin
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-64 md:h-auto animate-fade-in">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/20 rounded-full blur-3xl"></div>
                <div className="relative bg-white rounded-xl shadow-xl p-6 border animate-slide-up">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-2 w-24 bg-green-100 rounded-full"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      <div className="h-2 w-40 bg-muted rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      <div className="h-2 w-32 bg-muted rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      <div className="h-2 w-36 bg-muted rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="w-full py-20 px-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez les fonctionnalités de notre portail conçu pour simplifier votre expérience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="card-hover border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileTextIcon className="w-6 h-6 text-green-600" />
                  Espace Admin
                </CardTitle>
                <CardDescription>Gérez et téléchargez des documents pour les utilisateurs</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Téléchargement de documents simplifiés</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Gestion des accès utilisateurs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Organisation par catégories</span>
                  </li>
                </ul>
                <Link to="/hr">
                  <Button className="w-full bg-green-600 hover:cursor-pointer">Accéder à l'espace Admin</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="card-hover border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserIcon className="w-6 h-6 text-green-600" />
                  Espace Utilisateur
                </CardTitle>
                <CardDescription>Consultez vos documents et utilisez l'assistant virtuel</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Accès à tous vos documents</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Assistant virtuel disponible 24/7</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Recherche intelligente</span>
                  </li>
                </ul>
                <Link to="/user">
                  <Button variant="outline" className="w-full hover:cursor-pointer">
                    Accéder à l'espace utilisateur
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
