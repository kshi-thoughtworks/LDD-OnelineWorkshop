import Sprite, { SpriteBox } from './index';
import { drawText } from './text'

const stickyNoteType = 'sticky'
export type StickyNoteType = 'sticky'
export class StickyNoteProps {
  type: string = stickyNoteType
  id?: number
  x!: number
  y!: number
  width!: number
  height!: number
  content!: string
  color!: string
  scale: { x: number, y: number } = { x: 1, y: 1}
  version!: number

  compare<StickyNoteProps>(props): boolean{
    const { x, y, content, color, scale, version } = props
    const scaleX = scale && scale.x ? scale.x : 1
    const scaleY = scale && scale.y ? scale.y : 1
    const thisScaleX = this.scale && this.scale.x ? this.scale.x : 1
    const thisScaleY = this.scale && this.scale.y ? this.scale.y : 1
    return this.x  === x 
            && this.y === y 
            && this.content === content 
            && this.color === color
            && thisScaleX === scaleX
            && thisScaleY === scaleY
            && this.version === this.version;
  }

  toSpriteBox(): SpriteBox{
    return { x: this.x, y: this.y, width: this.width, height: this.height, scale: this.scale }
  }

  updateSpriteBox(box: SpriteBox){
    this.x = box.x
    this.y = box.y
    this.width = box.width
    this.height = box.height
    this.scale = box.scale
  }

  static build(props: StickyNoteProps): StickyNoteProps {
    const stickyNoteProps = new StickyNoteProps()
    stickyNoteProps.type = stickyNoteType
    stickyNoteProps.id = props.id
    stickyNoteProps.x = props.x
    stickyNoteProps.y = props.y
    stickyNoteProps.width = props.width
    stickyNoteProps.height = props.height
    stickyNoteProps.scale = props.scale || { x: 1, y: 1 }
    stickyNoteProps.content = props.content
    stickyNoteProps.color = props.color
    stickyNoteProps.version = props.version
    return stickyNoteProps
  }
}

export default class StickyNoteSprite extends Sprite<StickyNoteProps>{
  static type: string = 'sticky'
  constructor(props: StickyNoteProps) {
    super(props)
    this.id = props.id!
    this.props = props
  }

  drawBackground(){
    const context = this.stage!.context!
    const { color, x, y, width, height } = this.props
    context.save()

    context.shadowBlur = 4
    context.shadowColor = 'rgba(0, 0, 0, 0.6)'
    context.fillStyle = color
    context.fillRect(0, 0, width, height)
    
    context.restore()
  }
  drawText() {
    const { content, width, height } = this.props
    drawText(this.stage!.context!, { content, width, height })
  }
  draw() {
    const context = this.stage!.context!
    const { x, y, scale: { x: scaleX, y: scaleY } = { x: 1, y: 1 } } = this.props
    context.save()
    context.translate(x, y)
    context.scale(scaleX, scaleY)

    this.drawBackground()
    this.drawText()

    context.restore()
  }
  static build(props: StickyNoteProps) {
    const stickyNoteProps = StickyNoteProps.build(props)
    return new StickyNoteSprite(stickyNoteProps)
  }
}