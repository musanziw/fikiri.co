export default function HowToCandidate() {

    return (
        <div className="p-8 mx-auto max-w-screen-sm">
            <h2 className={'text-2xl font-semibold'}>Comment postulez ?</h2>
            <div className={'flex flex-col gap-8 mt-8'}>
                <div className={'flex flex-col gap-4'}>
                    <h3 className={'text-xl font-semibold'}>1. Créer un compte</h3>
                    <p className={'text-lg'}>
                        Pour postuler, il faut d&apos;abord créer un compte. Pour cela, il suffit de cliquer sur le bouton Créer un compte en haut à droite de l&apos;écran.
                    </p>
                </div>
                <div className={'flex flex-col gap-4'}>
                    <h3 className={'text-xl font-semibold'}>2. Remplir le formulaire</h3>
                    <p className={'text-lg'}>
                        Une fois connecté, il faut remplir le formulaire de candidature. Il est accessible depuis le bouton Postuler dans le menu de navigation.
                    </p>
                </div>
                <div className={'flex flex-col gap-4'}>
                    <h3 className={'text-xl font-semibold'}>3. Attendre la réponse</h3>
                    <p className={'text-lg'}>
                        Une fois le formulaire rempli, il ne reste plus qu&apos;à attendre la réponse de l&apos;administration.
                    </p>
                </div>
            </div>

        </div>
    )

}