import { Component, ElementRef, ViewChild } from '@angular/core';
import moment from 'moment';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api.service';

declare var QRCode: any;
declare var QRCodeStyling: any;


@Component({
  selector: 'app-print-qr',
  imports: [],
  templateUrl: './print-qr.html',
  styleUrl: './print-qr.scss'
})
export class PrintQr {

  companyData: any = JSON.parse(localStorage.getItem(environment.userData) || '{}');
  env: any = environment
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.companyData = this.companyData?.COMPANY_CODE;

    this.apiService.GET("api/print-qr").subscribe({
      next: (res: any) => {
        this.generateQr(res?.VISITOR_URL, 'qr-code-visitor');
        this.generateQr(res?.EMPLOYEE_URL, 'qr-code-employee');
      }
    })
  }

  generateQr(qrData: string, id: string): void {
    const qrCode = new QRCodeStyling({
      type: 'canvas',
      width: 200,
      height: 200,
      data: qrData,
      margin: 5,
      qrOptions: {
        errorCorrectionLevel: 'Q'
      },
      dotsOptions: {
        type: 'classy',
        color: '#000000'
      },
      backgroundOptions: {
        color: '#ffffff'
      }
    });

    const canvasElement = document.getElementById(id);
    if (canvasElement) {
      canvasElement.innerHTML = '';
      qrCode.append(canvasElement);
    }
  }

  // ----- html to pdf
  // import jsPDF from 'jspdf';
  // import html2canvas from 'html2canvas';
  @ViewChild('pdfVisitorContent', { static: false }) pdfVisitorContent!: ElementRef;
  @ViewChild('pdfEmployeeContent', { static: false }) pdfEmployeeContent!: ElementRef;
  onPrintPDF(htmlElement: ElementRef) {
    const DATA: HTMLElement = htmlElement.nativeElement;

    // Optional: temporarily expand scrollable area
    const originalHeight = DATA.style.height;
    const originalOverflow = DATA.style.overflow;
    DATA.style.height = 'auto';
    DATA.style.overflow = 'visible';

    html2canvas(DATA, {
      scrollY: -window.scrollY,
      scale: 2, // better resolution
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      // A4 size in mm
      const pdfWidth = 210;
      const pdfHeight = 297;

      // Convert px → mm
      const pxPerMM = 1 / 0.264583; // ~3.78
      const contentWidthMM = canvas.width / pxPerMM;
      const contentHeightMM = canvas.height / pxPerMM;

      // Scale content to fit A4 width
      let renderWidth = pdfWidth - 20; // 10mm left/right margin
      let renderHeight = (contentHeightMM * renderWidth) / contentWidthMM;

      // If content is taller than A4 height, scale to fit height instead
      if (renderHeight > pdfHeight - 20) {
        renderHeight = pdfHeight - 20;
        renderWidth = (contentWidthMM * renderHeight) / contentHeightMM;
      }

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const marginX = (pdfWidth - renderWidth) / 2;
      const marginY = (pdfHeight - renderHeight) / 2;

      pdf.addImage(imgData, 'PNG', marginX, marginY, renderWidth, renderHeight);

      pdf.save(`${environment.appName}_QR_${moment().format('YYYY-MM-DD')}.pdf`);

      // Restore styles
      DATA.style.height = originalHeight;
      DATA.style.overflow = originalOverflow;
    });
  }
}
