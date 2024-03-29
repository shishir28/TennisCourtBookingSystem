import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FuryCardModule } from "../../../@fury/shared/card/card.module";
import { ClickOutsideModule } from "../../../@fury/shared/click-outside/click-outside.module";
import { MaterialModule } from "../../../@fury/shared/material-components.module";
import { ScrollbarModule } from "../../../@fury/shared/scrollbar/scrollbar.module";
import { ToolbarFullscreenToggleComponent } from "./toolbar-fullscreen-toggle/toolbar-fullscreen-toggle.component";
import { ToolbarSidenavMobileToggleComponent } from "./toolbar-sidenav-mobile-toggle/toolbar-sidenav-mobile-toggle.component";
import { ToolbarUserComponent } from "./toolbar-user/toolbar-user.component";
import { ToolbarComponent } from "./toolbar.component";
import { AuthenticationService } from "../../authentication/authentication.service";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ScrollbarModule,
    FormsModule,
    ClickOutsideModule,
    FuryCardModule,
  ],
  declarations: [
    ToolbarComponent,
    ToolbarUserComponent,
    ToolbarFullscreenToggleComponent,
    ToolbarSidenavMobileToggleComponent,
  ],
  exports: [ToolbarComponent],
  providers: [AuthenticationService],
})
export class ToolbarModule {}
