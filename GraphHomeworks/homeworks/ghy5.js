two.clear()

const point = [180, 180]

function setPont(x, y, color='white') {
	two.makeCircle(x, y, 4).fill = color
}

function setLine(x1, y1, x2, y2) {
	two.makeLine(x1, y1, x2, y2)
}

function setRect(x1, y1, x2, y2, color='black') {
	let delta_x = Math.abs(x2 - x1)
	let delta_y = Math.abs(y2 - y1)
	two.makeRectangle(
		(x1 + x2)/2,
		(y1 + y2)/2,
		delta_x, delta_y
	).fill = color
}

function set1PointPerspectiveLine(x1, y1, x2, y2) {
	setRect(x1, y1, x2, y2)
	setLine(x1, y1, 180, 180)
	setLine(x2, y2, ...point)
	setLine(x1, y2, ...point)
	setLine(x2, y1, ...point)
}

setPont(...point)
set1PointPerspectiveLine(120, 130, 150, 160)
set1PointPerspectiveLine(80, 200, 130, 220)
set1PointPerspectiveLine(200, 100, 250, 150)
set1PointPerspectiveLine(300, 200, 320, 300)
set1PointPerspectiveLine(160, 250, 200, 300)

two.update()