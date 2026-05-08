import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function FAQItem({ value, question, answer }) {
  return (
    <AccordionItem
      value={value}
      className="border border-slate-200 rounded-xl px-5 mb-3 bg-white shadow-sm"
    >
      <AccordionTrigger className="text-sm font-semibold text-[#1e3a5f] py-4 hover:no-underline text-left">
        {question}
      </AccordionTrigger>
      <AccordionContent className="text-slate-600 text-sm leading-relaxed pb-4">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
}
