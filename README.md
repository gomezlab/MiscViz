# MiscViz
Visualizations and JavaScript objects for the GomezLab

'index.html' is in the /dist folder
'viz.json' is in the /dist folder

Currently running on Node Package Manager (NPM) although the code is just using a CDN to access D3, so NPM isn't necessary. Downloading and running `npm run start` will run the visualization, although any other web server just needs to process 'index.html' in the /src folder. NPM uses installable module `http-server` to render the page. 

To alter the JSON for the visualization, see the 'understudied_bubble' Jupyter notebook in the /notebooks folder. This can certainly be converted to a Python function/script for prespecified input formats.
