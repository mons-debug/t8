export const metadata = {
  title: "Conditions Générales — T8 Auto",
  description: "Conditions générales de location de voitures T8 Auto à Tanger.",
};

export default function TermsPage() {
  return (
    <main className="flex-1">
      <section className="bg-t8-cream px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Conditions Générales
          </h1>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-8 text-sm text-muted-foreground">
          <div>
            <h2 className="mb-2 text-lg font-bold text-foreground">1. Location</h2>
            <p>
              La location commence à la date et heure de prise en charge convenues et se termine
              à la date et heure de restitution prévues. Tout retard de restitution sera facturé
              au tarif journalier applicable.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-bold text-foreground">2. Conditions du conducteur</h2>
            <p>
              Le conducteur doit être âgé d'au moins 21 ans et posséder un permis de conduire
              valide depuis au moins 2 ans. Une pièce d'identité valide est requise.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-bold text-foreground">3. Paiement</h2>
            <p>
              Le paiement s'effectue au moment de la prise en charge du véhicule. Les tarifs
              affichés incluent l'assurance de base et les kilomètres illimités. Un dépôt de
              garantie peut être demandé.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-bold text-foreground">4. Assurance</h2>
            <p>
              Tous nos véhicules sont couverts par une assurance responsabilité civile.
              Le locataire reste responsable des dommages causés au véhicule en cas de
              négligence ou de non-respect du code de la route.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-bold text-foreground">5. Carburant</h2>
            <p>
              Le véhicule est remis avec un niveau de carburant déterminé. Il doit être
              restitué avec le même niveau. Des frais de ravitaillement seront appliqués
              dans le cas contraire.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-bold text-foreground">6. Annulation</h2>
            <p>
              Toute annulation effectuée au moins 24 heures avant la prise en charge est
              gratuite. Les annulations tardives peuvent entraîner des frais.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-bold text-foreground">7. Contact</h2>
            <p>
              Pour toute question concernant ces conditions, contactez-nous au
              +212 660 027 233 ou par email à contact@t8-auto.com.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
