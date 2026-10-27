float[][] dataSet = new float[6][2];
Table dataTable;

void setup() {
  size(800,800);
  dataTable = loadTable("https://docs.google.com/spreadsheets/d/e/2PACX-1vQJlf_rWrhaB3AnLXqre92eQj1hA13PL2bXhZlvKveBak0pYgPTtxbPz_w7EAcoEpE1uiRBekC-pwvt/pubhtml");
  for( int i = 1; i <= dataSet.length; i++ ) {
    dataSet[i][0] = dataTable.getFloat(i+1, 2);
    dataSet[i][1] = dataTable.getFloat(i+1,3);
  }
}

void draw() {
  // drawing axes
  // drawing labels
  for( int i = 0; i < 6; i++ ) {
    drawDataRectangle( i, i * width/7 + width/14, height - (height - 100), (width/6) * 0.5, dataSet[i][1], dataSet[i][2]); 
  }
}

void drawDataRectangle( int i, float x, float y, float w, float a, float b) {
  color modifiedColor;
  colorMode(HSB);
  modifiedColor = color(hue(i*60), 50, map( a, 90, 100, 0, 100 ) );
  float h = map(b, 90, 100, 0, 100); // based on the data[0]
  fill( modifiedColor ); // modified by the data[1]
  rect( x, y, w, h );
  colorMode(RGB);
}
