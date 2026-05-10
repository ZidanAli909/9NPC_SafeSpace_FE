import { FAQContactCard } from "@/components/public/faq/FAQCommon"
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

const items = [
  {
    value: "faq1",
    trigger: "Saya lupa password. Bagaimana cara meresetnya?",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni ex placeat sit impedit libero explicabo, minima eaque voluptas atque suscipit est incidunt eveniet eius veritatis, numquam sint excepturi officia laboriosam!",
  },
  {
    value: "faq2",
    trigger: "Saya sudah login, tapi tidak bisa mengakses halaman Lapor. Kenapa?",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni ex placeat sit impedit libero explicabo, minima eaque voluptas atque suscipit est incidunt eveniet eius veritatis, numquam sint excepturi officia laboriosam!",
  },
  {
    value: "faq3",
    trigger: "Unggahan bukti (foto/video/dokumen) selalu gagal. Apa yang harus saya lakukan?",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni ex placeat sit impedit libero explicabo, minima eaque voluptas atque suscipit est incidunt eveniet eius veritatis, numquam sint excepturi officia laboriosam!",
  },
  {
    value: "faq4",
    trigger: "Saya tidak menerima notifikasi status laporan padahal sudah berubah. Kenapa?",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni ex placeat sit impedit libero explicabo, minima eaque voluptas atque suscipit est incidunt eveniet eius veritatis, numquam sint excepturi officia laboriosam!",
  },
  {
    value: "faq5",
    trigger: "Apakah saya bisa mengedit atau membatalkan laporan yang sudah terkirim?",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni ex placeat sit impedit libero explicabo, minima eaque voluptas atque suscipit est incidunt eveniet eius veritatis, numquam sint excepturi officia laboriosam!",
  },
]

export function FAQPage() {
    return (
        <div  className={commonStyle_Page}>
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
                <p className="text-2xl font-semibold mb-4 max-md:mb-2">Pertanyaan yang Sering Diajukan</p>
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