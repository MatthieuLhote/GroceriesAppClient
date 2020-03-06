import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SigninaddressPage } from './signinaddress.page';

describe('SigninaddressPage', () => {
  let component: SigninaddressPage;
  let fixture: ComponentFixture<SigninaddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninaddressPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SigninaddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
