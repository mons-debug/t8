import { db } from "@/db";
import { settings } from "@/db/schema";
import { SettingsForm } from "@/components/admin/settings-form";

export default async function SettingsPage() {
  const allSettings = await db.select().from(settings);
  const settingsMap = Object.fromEntries(
    allSettings.map((s) => [s.key, s.value])
  );

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Paramètres</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Informations de l'entreprise et configuration
        </p>
      </div>
      <SettingsForm settings={settingsMap} />
    </div>
  );
}
