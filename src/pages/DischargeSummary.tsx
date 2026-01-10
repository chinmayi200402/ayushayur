import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Printer, User, Calendar, Activity, Utensils, ArrowRight } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DischargePrintView } from "@/components/discharge/DischargePrintView";

interface PatientData {
  id: number;
  name: string;
  age: number;
  gender: string;
  contact: string;
  bloodGroup: string;
  admissionDate: string;
  dischargeDate: string;
  diagnosis: string;
  treatingDoctor: string;
  initialPrakriti: { vata: number; pitta: number; kapha: number };
  finalPrakriti: { vata: number; pitta: number; kapha: number };
  treatmentPlan: {
    day: number;
    therapy: string;
    completed: boolean;
  }[];
  dietAdvice: string[];
  followUp: string;
}

const patientsData: PatientData[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    age: 45,
    gender: "Male",
    contact: "+91 98765 43210",
    bloodGroup: "O+",
    admissionDate: "2024-01-05",
    dischargeDate: "2024-01-12",
    diagnosis: "Vata-Pitta Imbalance, Chronic Lower Back Pain",
    treatingDoctor: "Dr. Anil Sharma",
    initialPrakriti: { vata: 55, pitta: 30, kapha: 15 },
    finalPrakriti: { vata: 38, pitta: 35, kapha: 27 },
    treatmentPlan: [
      { day: 1, therapy: "Snehapana (Internal Oleation)", completed: true },
      { day: 2, therapy: "Snehapana (Increased dose)", completed: true },
      { day: 3, therapy: "Abhyanga + Swedana", completed: true },
      { day: 4, therapy: "Kati Basti", completed: true },
      { day: 5, therapy: "Virechana (Purgation)", completed: true },
      { day: 6, therapy: "Samsarjana Krama Day 1", completed: true },
      { day: 7, therapy: "Samsarjana Krama Day 2", completed: true },
    ],
    dietAdvice: [
      "Follow Vata-pacifying diet for 2 weeks",
      "Prefer warm, cooked, moist foods",
      "Avoid cold, raw, and dry foods",
      "Include ghee, sesame oil in cooking",
      "Drink warm water throughout the day",
      "Have dinner before 7 PM",
      "Avoid caffeine and carbonated drinks",
    ],
    followUp: "Follow-up consultation after 2 weeks. Continue prescribed Ashwagandha Churna and Dhanwantaram Tailam for external application.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    age: 32,
    gender: "Female",
    contact: "+91 87654 32109",
    bloodGroup: "A+",
    admissionDate: "2024-01-08",
    dischargeDate: "2024-01-22",
    diagnosis: "Pitta-Kapha Imbalance, Skin Disorders, Digestive Issues",
    treatingDoctor: "Dr. Meera Nair",
    initialPrakriti: { vata: 20, pitta: 50, kapha: 30 },
    finalPrakriti: { vata: 28, pitta: 38, kapha: 34 },
    treatmentPlan: [
      { day: 1, therapy: "Deepana-Pachana", completed: true },
      { day: 2, therapy: "Snehapana Day 1", completed: true },
      { day: 3, therapy: "Snehapana Day 2", completed: true },
      { day: 4, therapy: "Snehapana Day 3", completed: true },
      { day: 5, therapy: "Abhyanga + Swedana", completed: true },
      { day: 6, therapy: "Virechana", completed: true },
      { day: 7, therapy: "Rest Day", completed: true },
      { day: 8, therapy: "Samsarjana Krama Day 1", completed: true },
      { day: 9, therapy: "Samsarjana Krama Day 2", completed: true },
      { day: 10, therapy: "Samsarjana Krama Day 3", completed: true },
      { day: 11, therapy: "Takradhara", completed: true },
      { day: 12, therapy: "Takradhara", completed: true },
      { day: 13, therapy: "Lepam Treatment", completed: true },
      { day: 14, therapy: "Final Assessment", completed: true },
    ],
    dietAdvice: [
      "Follow Pitta-pacifying diet for 3 weeks",
      "Prefer cooling foods like cucumber, coconut",
      "Avoid spicy, sour, and fermented foods",
      "Include bitter gourd, neem in diet",
      "Drink cooling herbal teas",
      "Avoid direct sun exposure",
      "Practice stress management techniques",
    ],
    followUp: "Monthly follow-up for 3 months. Continue Triphala Churna at bedtime.",
  },
];

export default function DischargeSummary() {
  const [selectedPatientId, setSelectedPatientId] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const selectedPatient = patientsData.find(p => p.id.toString() === selectedPatientId);

  const generatePDF = async () => {
    if (!printRef.current || !selectedPatient) return;

    setIsGenerating(true);
    try {
      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;

      // Calculate how many pages we need
      const pageHeight = pdfHeight * (imgWidth / pdfWidth);
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", imgX, position * ratio, imgWidth * ratio, imgHeight * ratio);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", imgX, position * ratio, imgWidth * ratio, imgHeight * ratio);
        heightLeft -= pageHeight;
      }

      pdf.save(`Discharge_Summary_${selectedPatient.name.replace(/\s+/g, "_")}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    if (!printRef.current) return;
    const printContent = printRef.current.innerHTML;
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Discharge Summary - ${selectedPatient?.name}</title>
            <style>
              body { font-family: 'Inter', sans-serif; padding: 20px; }
              .print-container { max-width: 800px; margin: 0 auto; }
            </style>
          </head>
          <body>
            <div class="print-container">${printContent}</div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="font-display text-3xl font-semibold text-foreground">
              Discharge Summary
            </h1>
            <p className="text-muted-foreground mt-1">
              Generate comprehensive discharge reports for patients
            </p>
          </div>
          <div className="w-full md:w-72">
            <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select patient" />
              </SelectTrigger>
              <SelectContent>
                {patientsData.map((p) => (
                  <SelectItem key={p.id} value={p.id.toString()}>
                    {p.name} ({p.treatmentPlan.length} days)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {!selectedPatient ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card rounded-2xl border border-border p-12 text-center"
          >
            <FileText className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="font-display text-xl font-semibold mb-2">Select a Patient</h3>
            <p className="text-muted-foreground">
              Choose a patient to generate their discharge summary
            </p>
          </motion.div>
        ) : (
          <>
            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex gap-4"
            >
              <Button
                onClick={generatePDF}
                disabled={isGenerating}
                className="rounded-xl bg-primary text-primary-foreground"
              >
                <Download className="w-4 h-4 mr-2" />
                {isGenerating ? "Generating..." : "Download PDF"}
              </Button>
              <Button
                onClick={handlePrint}
                variant="outline"
                className="rounded-xl"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
            </motion.div>

            {/* Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden"
            >
              <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Preview</span>
                <span className="text-xs text-muted-foreground">A4 Format</span>
              </div>
              <div className="p-6 bg-muted/10 overflow-auto max-h-[800px]">
                <div ref={printRef}>
                  <DischargePrintView patient={selectedPatient} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
