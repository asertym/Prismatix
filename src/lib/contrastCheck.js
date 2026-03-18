import { APCAcontrast, displayP3toY } from 'apca-w3';
import Color from 'colorjs.io';

export default function (foreground, background, fsize) {
	let text = new Color(foreground).to('p3').coords;
	let bg = new Color(background).to('p3').coords;

	let lcontrast = APCAcontrast(displayP3toY(text), displayP3toY(bg));
}
