import 'style';
import { skipHello } from '@pixi/utils';
import { applicationStart } from "@/core/App"

document.oncontextmenu = _ => false;
skipHello()

applicationStart()