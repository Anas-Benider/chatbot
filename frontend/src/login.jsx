import { useId } from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Login() {
  const id = useId()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={"hover:cursor-pointer"}>Se connecter</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true">
            <img src="/cnexia-No-bg.png" />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">Bienvenue à nouveau !</DialogTitle>
            <DialogDescription className="sm:text-center">
              Saisissez vos identifiants pour accéder à votre compte.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5">
          <div className="space-y-4">
            <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-email`}>Email</Label>
              <Input id={`${id}-email`} placeholder="exemple@cnexia.com" type="email" required />
            </div>
            <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-password`}>Mot de passe</Label>
              <Input
                id={`${id}-password`}
                placeholder="Saisissez votre mot de passe"
                type="password"
                required />
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="flex items-center gap-2">
              <Checkbox id={`${id}-remember`} />
              <Label htmlFor={`${id}-remember`} className="text-muted-foreground font-normal">
                Se souvenir de moi
              </Label>
            </div>
            <a className="text-sm underline hover:no-underline" href="#">
              Mot de passe oublié ?
            </a>
          </div>
          <Button type="button" className="w-full bg-green-700 hover:cursor-pointer">
            Se connecter
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
