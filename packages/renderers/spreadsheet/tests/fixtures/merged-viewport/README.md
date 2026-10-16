# Merged viewport regression fixture

This synthetic OOXML workbook was generated for this regression and contains no user data.
It has one sheet, `Merged viewport`, with a styled merge `B2:H27` and ordinary numeric cells in column M.

1. Open `merged-viewport.xlsx` with the spreadsheet renderer at 100% zoom.
2. Scroll horizontally until column B is outside the viewport while part of B:H remains visible.
3. Scroll vertically until row 2 is outside the viewport while part of rows 2:27 remains visible.
4. Repeat with both axes displaced, then scroll back to the origin.

Expected: the intersecting part of the merge retains its original text, dark background,
red border and original position. Ordinary cells stay unchanged. The covered cells must not
receive copied anchor values.

`patched-diagonal.png` shows the downstream integration after both grid and renderer fixes,
at a 1280 x 720 browser viewport and 100% zoom. The top-left merge anchor is offscreen;
text is clipped at its original position rather than recentered into the visible area.
This is a downstream npm 3.2.1 + e-virt-table 1.4.16 integration screenshot, not a claim
that this public-source branch has been built in every environment.

The source PR requires the paired grid change before its new configuration callback can typecheck.
The standalone `tests/merged-window.test.mjs` covers direct jumps across data windows.
Windows WebView2 validation remains outstanding.
