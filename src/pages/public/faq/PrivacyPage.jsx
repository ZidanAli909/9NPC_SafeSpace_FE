import { FAQContactCard } from "@/components/public/FAQCommon"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { commonStyle_Page, commonStyle_Section } from "@/lib/commonStyles"
import { Link } from "react-router-dom"

const items = [
  {
    value: "faq1",
    trigger: "Apakah laporan saya dirahasiakan?",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni ex placeat sit impedit libero explicabo, minima eaque voluptas atque suscipit est incidunt eveniet eius veritatis, numquam sint excepturi officia laboriosam!",
  },
  {
    value: "faq2",
    trigger: "Apakah saya bisa melapor secara anonim?",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni ex placeat sit impedit libero explicabo, minima eaque voluptas atque suscipit est incidunt eveniet eius veritatis, numquam sint excepturi officia laboriosam!",
  },
  {
    value: "faq3",
    trigger: "Bagaimana SafeSpace melindungi data saya?",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni ex placeat sit impedit libero explicabo, minima eaque voluptas atque suscipit est incidunt eveniet eius veritatis, numquam sint excepturi officia laboriosam!",
  },
  {
    value: "faq4",
    trigger: "Apa yang terjadi setelah saya mengirim laporan?",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni ex placeat sit impedit libero explicabo, minima eaque voluptas atque suscipit est incidunt eveniet eius veritatis, numquam sint excepturi officia laboriosam!",
  },
  {
    value: "faq5",
    trigger: "Apakah laporan saya akan diteruskan ke polisi atau pihak kampus?",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni ex placeat sit impedit libero explicabo, minima eaque voluptas atque suscipit est incidunt eveniet eius veritatis, numquam sint excepturi officia laboriosam!",
  },
]

export function PrivacyPage() {
    return (
        <div className={commonStyle_Page}>
            <div className={commonStyle_Section}>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage>FAQ</BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Pusat Bantuan Teknis</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className={commonStyle_Section + " max-w-4xl mx-auto"}>
                <p className="text-2xl font-semibold mb-4">Kebijakan Privasi Pelapor</p>
                <p className="text-sm">Kami memahami bahwa Anda mungkin memiliki kekhawatiran. Berikut jawaban atas pertanyaan yang paling sering diajukan.</p>
            </div>
            
            <div className={commonStyle_Section + " max-w-4xl mx-auto"}>
                <Accordion multiple className="mx-auto rounded-lg border" defaultValue={["faq1"]}>
                    {items.map((item) => (
                        <AccordionItem key={item.value} value={item.value} className="border-b px-8 last:border-b-0">
                            <AccordionTrigger>{item.trigger}</AccordionTrigger>
                            <AccordionContent>{item.content}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
            
            <FAQContactCard />
        </div>
    )
}