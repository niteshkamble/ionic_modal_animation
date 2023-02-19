import { Component } from '@angular/core';
import { ActionSheetController, AnimationController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private  actionSheetCtrl:ActionSheetController,private animationCtrl:AnimationController) {}


  async openModal(){
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Example header',
      subHeader: 'Example subheader',
      enterAnimation: (baseEl : any)=>{
        const root = baseEl;

        const backDropAnimation = this.animationCtrl.create()
          .addElement(root.querySelector('ion-backdrop')!)
          .fromTo('opacity','0.01','var(--backdrop-opacity)');

        const wrapperAnimation = this.animationCtrl.create()
          .addElement(root.querySelector('.action-sheet-wrapper')!)
          .keyframes([
            {offset:0,transform:'translateX(-100%)'},
            {offset:1,transform:'translateX(0)'}
          ])

          return this.animationCtrl.create()
          .addElement(baseEl)
          .easing('ease-out')
          .duration(500)
          .addAnimation([backDropAnimation,wrapperAnimation]);
      },
      leaveAnimation : (baseEl : any)=>{
        const root = baseEl;

        const backDropAnimation = this.animationCtrl.create()
          .addElement(root.querySelector('ion-backdrop')!)
          .fromTo('opacity','var(--backdrop-opacity)','0');

        const wrapperAnimation = this.animationCtrl.create()
          .addElement(root.querySelector('.action-sheet-wrapper')!)
          .keyframes([
            {offset:0,transform:'translateX(0)'},
            {offset:1,transform:'translateX(100%)'},
          ])

          return this.animationCtrl.create()
          .addElement(baseEl)
          .easing('ease-out')
          .duration(500)
          .addAnimation([backDropAnimation,wrapperAnimation]);
      },
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Share',
          data: {
            action: 'share',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

}
