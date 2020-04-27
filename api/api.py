import time
from flask import Flask

import io
import random
from flask import Response
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure

from scanner import pairs_scanner

pscanner = pairs_scanner.Scanner()


app = Flask(__name__)


@app.route('/api/plot.png')
def plot_png():
    fig = create_figure()
    output = io.BytesIO()
    FigureCanvas(fig).print_png(output)
    return Response(output.getvalue(), mimetype='image/png')


def create_figure():
    fig = Figure()
    axis = fig.add_subplot(1, 1, 1)
    xs = range(100)
    ys = [random.randint(1, 50) for x in xs]
    axis.plot(xs, ys)
    return fig


@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/api/scanforpairs')
def pair_scan():

    pairs = pscanner.run_pairs_scan()

    return {"pairs": pairs}
