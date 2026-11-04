float[][] dataSet = new float[6][2];
Table dataTable;
float x;
float y;
float totalx;
float totaly;
float avHeight;
int offset;
int hue;

void setup() {
  size(800,800);
  dataTable = loadTable("https://docs.google.com/spreadsheets/d/e/2PACX-1vQJlf_rWrhaB3AnLXqre92eQj1hA13PL2bXhZlvKveBak0pYgPTtxbPz_w7EAcoEpE1uiRBekC-pwvt/pub?gid=0&single=true&output=csv", "header, csv");
  for( int i = 0; i < dataSet.length; i++ ) {
    x = dataTable.getFloat(i,1);
    totalx += x;
    y = dataTable.getFloat(i, 2);
    totaly += y;
    dataSet[i][0] = x;
    dataSet[i][1] = y;
  }
  totalx /= 6;
  totaly /= 6;
}

void draw() {
  // drawing axes
  // drawing labels
  for( int i = 0; i < 6; i++ ) {
    drawDataRectangle( i+offset, i * width/8 + width/16, height - (height - 200), (width/6) * 0.5, dataSet[i][0], dataSet[i][1]); 
  }
  drawAverageRectangle(totalx, totaly);
}

void drawDataRectangle( int i, float x, float y, float w, float a, float b) {
  color modifiedColor;
  colorMode(HSB, 360, 100, 100);
  hue = ((i+offset)*60)%360;
  modifiedColor = color(hue, 80, map( a, 90, 100, 0, 100 ) );
  float h = map(b, 90, 100, 0, 100); // based on the data[0]
  fill( modifiedColor ); // modified by the data[1]
  y -= h;
  rect( x, y, w, h );
  colorMode(RGB);
}
void drawAverageRectangle(float a, float b) {
  color averageColor;
  colorMode(HSB, 360, 100, 100);
  averageColor = color(360, 0, map(a, 90, 100, 0, 100));
  avHeight = map(b, 90, 100, 0, 100);
  fill(averageColor);
  rect(6*width/8 + width/16, height - (height-200) - avHeight, (width/6) * 0.5, avHeight);
}

void keyPressed() {
  offset++;
  if(offset>=6) {
    offset = 0;
  }
}
