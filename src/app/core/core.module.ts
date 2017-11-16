import { NgModule, Optional, SkipSelf } from '@angular/core'; // 追加
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // 追加
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [ // 追加
    HeaderComponent
  ],
  declarations: [
    HeaderComponent
  ]
})

export class CoreModule {

    constructor (@Optional() @SkipSelf() parentModule: CoreModule) { // 追加
      if (parentModule) {
        throw new Error(
          'CoreModule is already loaded. Import it in the AppModule only');
      }
    }

 }
