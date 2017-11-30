import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIdeaComponent } from './create-idea.component';
import { IdeaService } from '../services/idea.service';
import { MockIdeaService } from '../mockservices/mock-idea.service';
import { TagService } from '../services/tag.service';
import { MockTagService } from '../mockservices/mock-tag.service';
import { FormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from '../services/user.service';
import { MockUserService } from '../mockservices/mock-user.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MockUploadService } from '../mockservices/mock-upload.service';
import { UploadService } from '../services/upload.service';
import { Upload } from '../upload';
import { SplitAndGetLastPipe } from '../split-and-get-last.pipe';
import { NgbCollapseModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import {TextFormattingPipe} from "../pipes/text-formatting.pipe";

describe('CreateIdeaComponent', () => {
  let component: CreateIdeaComponent;
  let fixture: ComponentFixture<CreateIdeaComponent>;
  let titleElement: HTMLElement;
  let debugElement: DebugElement;
  let progressBar, uploadField, currentAttachment, descriptionField, previewButton, previewField: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, NgbCollapseModule.forRoot(), NgbPopoverModule.forRoot(), TagInputModule, RouterTestingModule, BrowserAnimationsModule ],
      declarations: [ CreateIdeaComponent, SplitAndGetLastPipe, TextFormattingPipe ],
      providers: [
        {provide: IdeaService, useClass: MockIdeaService},
        {provide: TagService, useClass: MockTagService},
        {provide: UserService, useClass: MockUserService},
        {provide: UploadService, useClass: MockUploadService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    fixture.detectChanges();
    uploadField = fixture.debugElement.query(By.css("input[type='file']"));
    currentAttachment = fixture.debugElement.query(By.css(".attachments"));
    descriptionField = fixture.debugElement.query(By.css("#description"));
    previewButton = fixture.debugElement.query(By.css("#btnPreview"));
    previewField = fixture.debugElement.query(By.css("#showPreview"));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have upload field', () => {
    expect(uploadField).toBeTruthy();
  });

  it('Should have current attachment area', () => {
    expect(currentAttachment).toBeTruthy();
  });

  it('Should preview description text', () => {

      //expect(previewField.nativeElement.collapsed).toBe(true);
      expect(previewButton.nativeElement.disabled).toBe(true);

      let exampleText = "Text";

      descriptionField.nativeElement.value = exampleText;
      descriptionField.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      previewButton.nativeElement.click();

      fixture.detectChanges();

      expect(previewField.nativeElement.innerHTML).toContain(exampleText);

    });

  it('Should transform description text in preview', () => {

    //expect(previewField.nativeElement.collapsed).toBe(true);
    expect(previewButton.nativeElement.disabled).toBe(true);

    let exampleText = "**bold**, _italic_, ~del~";

    descriptionField.nativeElement.value = exampleText;
    descriptionField.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    previewButton.nativeElement.click();

    fixture.detectChanges();

    expect(previewField.nativeElement.innerHTML).toContain("<b>bold</b>, <i>italic</i>, <del>del</del>");

  })
});
