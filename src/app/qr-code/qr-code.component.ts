import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit {

  // baseUrl: string = "https://localhost:7154/api/"; //TODO: instead of hard-coded string, use environment.ts
  baseUrl: string = environment.baseUrl; //TODO: instead of hard-coded string, use environment.ts
  model: any = {};

  imagePath: SafeResourceUrl = "";

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

  }

  generateQrCode() {
    this.http.post<any>(this.baseUrl + "qrcode/", this.model).subscribe(
      (data) => {
        this.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + data.qrCodeBase64);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getQrCodeImage() {
    if (!this.model) {
      return null;
    }

    const binaryString = window.atob(this.model.qrData);
    const byteNumbers = new Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      byteNumbers[i] = binaryString.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray], { type: 'image/png' });

    return URL.createObjectURL(blob);
  }
}
