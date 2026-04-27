import { Mail } from "lucide-react"

export function FAQContactCard() {
    return (
        <div className="px-8 py-4 max-w-3xl mx-auto rounded-lg bg-secondary-foreground text-secondary text-sm">
            <p className="text-lg font-semibold">Masih butuh bantuan teknis?</p>
            <p className="mb-4">Jika pertanyaanmu tidak terjawab di atas, silakan hubungi tim teknis kami melalui:</p>
            <div className="flex flex-row gap-2 items-center">
                <Mail />
                <p>E-mail</p>
                <p className="font-semibold underline">support@safespace.id</p>
            </div>
        </div>
    )
}