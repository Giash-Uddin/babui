import {Component, ElementRef, Input, NgZone, ViewChild} from '@angular/core';
import {BehaviorSubject, fromEvent, Subject, Subscription} from "rxjs";
import { takeUntil, tap } from 'rxjs/operators';
import {TextToSvgComponent} from "../text-to-svg/text-to-svg.component";

@Component({
  selector: 'app-image-rotate-resize-reposition',
  templateUrl: './image-rotate-resize-reposition.component.html',
  styleUrls: ['./image-rotate-resize-reposition.component.scss']
})
export class ImageRotateResizeRepositionComponent {

  @ViewChild(TextToSvgComponent) textToSvgComponent!: TextToSvgComponent;
  @ViewChild('boxWrapper', { static: true })
  boxWrapperElRef!: ElementRef<HTMLDivElement>;

  @ViewChild('box', { static: true }) boxElRef!: ElementRef<HTMLDivElement>;

  @ViewChild('rotate', { static: true })
  rotateElRef!: ElementRef<HTMLDivElement>;

  @Input() id!: string | number;

  @Input() minWidth: number = 50;
  @Input() minHeight: number = 50;

  @Input() initialTop: number = 50;
  @Input() initialLeft: number = 50;
  @Input() type: string = '';

  @Input() set disabled(disabled: boolean) {
    this.active$.next(!disabled);
  }

  private resizingSubs: Subscription[] = [];
  private draggingSub?: Subscription;

  active$ = new BehaviorSubject<boolean>(true);

  initX : any;
  initY : any;
  mousePressX : any;
  mousePressY : any;
  initW : any;
  initH : any;
  initRotate : any;

  scaleX : any=1;
  scaleY : any=1;

  get boxWrapper(): HTMLDivElement {
    return this.boxWrapperElRef.nativeElement;
  }

  get box(): HTMLDivElement {
    return this.boxElRef.nativeElement;
  }

  get rotateBtn(): HTMLDivElement {
    return this.rotateElRef.nativeElement;
  }

  private destroy$ = new Subject<void>();

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    console.log(this.boxWrapper, this.box);

    this.active$.pipe(takeUntil(this.destroy$)).subscribe((active : any) => {
      if (active) {
        this.enableResizing();
        this.enableDragging();
      } else {
        this.disableResizing();
        this.disableDrag();
      }
    });

    // this.handleResizing();
    this.handleRotating();

    this.resize(this.minWidth, this.minHeight);
    this.repositionElement(this.initialTop, this.initialLeft);
    this.boxWrapper.style.left = '50%';
    this.boxWrapper.style.top = '50%';
  }

  private repositionElement(x: number, y: number): void {
    this.boxWrapper.style.left = x + 'px';
    this.boxWrapper.style.top = y + 'px';
  }

  private resize(width: number, height: number): void {
    this.box.style.width = width + 'px';
    this.box.style.height = height + 'px';

    if(this.type=='text' ){
      this.scaleX=this.scaleX + 0.2;
      this.scaleY=this.scaleY + 0.2;
      if (this.textToSvgComponent) {
        this.textToSvgComponent.init(this.scaleX, this.scaleY);
        console.log('Scaling Text:', this.scaleX, this.scaleY);
      } else {
        console.error('textToSvgComponent is not initialized.');
      }
    }
  }

  private rotateBox(deg: number): void {
    this.boxWrapper.style.transform = `rotate(${deg}deg)`;
  }

  private getCurrentRotation(el : any): number {
    var st = window.getComputedStyle(el, null);
    var tm =
      st.getPropertyValue('-webkit-transform') ||
      st.getPropertyValue('-moz-transform') ||
      st.getPropertyValue('-ms-transform') ||
      st.getPropertyValue('-o-transform') ||
      st.getPropertyValue('transform');
    ('none');
    if (tm != 'none') {
      var values = tm.split('(')[1].split(')')[0].split(',');
      var angle = Math.round(
        // @ts-ignore
        Math.atan2(values[1], values[0]) * (180 / Math.PI)
      );
      return angle < 0 ? angle + 360 : angle;
    }
    return 0;
  }

  enableResizing(): void {
    const leftTopMouseDown$ = fromEvent(
      this.getElById('left-top')!,
      'mousedown'
    ).pipe(tap((e : any) => this.resizeHandler(e, true, true, true, true)));

    const rightTopMouseDown$ = fromEvent(
      this.getElById('right-top')!,
      'mousedown'
    ).pipe(tap((e : any) => this.resizeHandler(e, false, true, true, true)));

    const rightBottomMouseDown$ = fromEvent(
      this.getElById('right-bottom')!,
      'mousedown'
    ).pipe(tap((e : any) => this.resizeHandler(e, false, false, true, true)));

    const leftBottomMouseDown$ = fromEvent(
      this.getElById('left-bottom')!,
      'mousedown'
    ).pipe(tap((e : any) => this.resizeHandler(e, true, false, true, true)));

    this.ngZone.runOutsideAngular(() => {
      this.resizingSubs.push(
        leftTopMouseDown$.subscribe(),
        rightTopMouseDown$.subscribe(),
        rightBottomMouseDown$.subscribe(),
        leftBottomMouseDown$.subscribe()
      );
    });
  }

  disableResizing(): void {
    this.resizingSubs.forEach((sub) => sub.unsubscribe());
  }

  enableDragging(): void {
    this.boxWrapper.style.position='absolute';
    const boxWrapperMouseDown$ = fromEvent<MouseEvent>(
      this.boxWrapper,
      'mousedown',
      { capture: true }
    ).pipe(
      tap((event: any) => {
        // @ts-ignore
        // if (
        //   event.target.className.indexOf('dot') > -1 || event.target.className != 'box'
        // ) {
        //   console.log(event.target.className);
        //   event.preventDefault();
        //   return;
        // }

        this.initX = this.boxWrapper.offsetLeft;
        this.initY = this.boxWrapper.offsetTop;
        this.mousePressX = event.clientX;
        this.mousePressY = event.clientY;

        const eventMoveHandler = (event : any) => {
          this.repositionElement(
            this.initX + (event.clientX - this.mousePressX),
            this.initY + (event.clientY - this.mousePressY)
          );
        };

        const eventEndHandler = () => {
          this.boxWrapper.removeEventListener(
            'mousemove',
            eventMoveHandler,
            false
          );
          window.removeEventListener('mouseup', eventEndHandler);
        };

        this.boxWrapper.addEventListener('mousemove', eventMoveHandler, false);

        window.addEventListener('mouseup', eventEndHandler, false);
      })
    );

    this.ngZone.runOutsideAngular(() => {
      this.draggingSub = boxWrapperMouseDown$.subscribe();
    });
  }

  disableDrag(): void {
    this.draggingSub?.unsubscribe();
  }

  handleRotating(): void {
    this.ngZone.runOutsideAngular(() => {
      this.rotateBtn!.addEventListener(
        'mousedown',
        (event : any) => {
          // if (event.target.className.indexOf("dot") > -1) {
          //     return;
          // }

          this.initX = this.boxWrapper.offsetLeft;
          this.initY = this.boxWrapper.offsetTop;
          this.mousePressX = event.clientX;
          this.mousePressY = event.clientY;

          let arrow = document.querySelector('#box');
          let arrowRects = arrow!.getBoundingClientRect();
          let arrowX = arrowRects.left + arrowRects.width / 2;
          let arrowY = arrowRects.top + arrowRects.height / 2;

          const eventMoveHandler = (event : any) => {
            let angle =
              Math.atan2(event.clientY - arrowY, event.clientX - arrowX) -
              Math.PI / 2;
            this.rotateBox((angle * 180) / Math.PI);
          };

          const eventEndHandler = () => {
            window.removeEventListener('mousemove', eventMoveHandler, false);
            window.removeEventListener('mouseup', eventEndHandler);
          };

          window.addEventListener('mousemove', eventMoveHandler, false);
          window.addEventListener('mouseup', eventEndHandler, false);
        },
        false
      );
    });
  }

  private resizeHandler(
    event : any,
    left = false,
    top = false,
    xResize = false,
    yResize = false
  ) {
    this.initX = this.boxWrapper.offsetLeft;
    this.initY = this.boxWrapper.offsetTop;
    this.mousePressX = event.clientX;
    this.mousePressY = event.clientY;

    this.initW = this.box.offsetWidth;
    this.initH = this.box.offsetHeight;

    this.initRotate = this.getCurrentRotation(this.boxWrapper);
    let initRadians = (this.initRotate * Math.PI) / 180;
    let cosFraction = Math.cos(initRadians);
    let sinFraction = Math.sin(initRadians);

    const adjustHandler = (event : any) => {
      const cx = this.initX + this.initW / 2;
      const cy = this.initY + this.initH / 2;
      const bottomRightX = event.clientX;
      const bottomRightY = event.clientY;
      const rotatedA = this.rotate(
        this.initX,
        this.initY,
        cx,
        cy,
        -this.initRotate
      );
      const newCenter = [
        (rotatedA[0] + bottomRightX) / 2,
        (rotatedA[1] + bottomRightY) / 2,
      ];

      const newTopLeft = this.rotate(
        rotatedA[0],
        rotatedA[1],
        newCenter[0],
        newCenter[1],
        this.initRotate
      );
      const newBottomRight = this.rotate(
        bottomRightX,
        bottomRightY,
        newCenter[0],
        newCenter[1],
        this.initRotate
      );

      this.resize(
        newBottomRight[0] - newTopLeft[0],
        newBottomRight[1] - newTopLeft[1]
      );
      this.repositionElement(newTopLeft[0], newTopLeft[1]);
    };

    window.addEventListener('mousemove', adjustHandler, false);
    window.addEventListener(
      'mouseup',
      function eventEndHandler() {
        window.removeEventListener('mousemove', adjustHandler, false);
        window.removeEventListener('mouseup', adjustHandler);
      },
      false
    );
  }

  private rotate(x : any, y : any, cx : any, cy : any, angle : any) {
    return [
      (x - cx) * Math.cos(angle) - (y - cy) * Math.sin(angle) + cx,
      (x - cx) * Math.sin(angle) + (y - cy) * Math.cos(angle) + cy,
    ];
  }

  private getElById(elId: string): HTMLElement | null {
    return this.boxWrapper.querySelector(`#${elId}`);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  ngAfterViewInit() {
    // Ensure the ViewChild reference is ready
    console.log('textToSvgComponent initialized:', this.textToSvgComponent);
  }

}
