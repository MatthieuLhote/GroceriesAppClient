import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SigninpersonPage } from './signinperson.page';

describe('SigninpersonPage', () => {
  let component: SigninpersonPage;
  let fixture: ComponentFixture<SigninpersonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninpersonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SigninpersonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
