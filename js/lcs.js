(function (lcs, undefined) {
    'use strict';
    // LCS Module

    function getLastElem(mat) {
        var row = mat.length - 1;
        var col = mat[row].length - 1;
        return mat[row][col];
    }

    function getMatch(sub, text) {
        var mat = populateMat(sub, text);

        var n = sub.length,
            m = text.length;
        if (getLastElem(mat) < n) return [];

        var indices = [];

        // move to the last element equal to n in the region
        while (mat[n - 1][m] === n || mat[n][m - 1] === n) {
            if (mat[n - 1][m] > mat[n][m - 1]) {
                n -= 1;
            } else {
                m -= 1;
            }
        }

        while (mat[n][m] > 0) {
            if (sub[n - 1] === text[m - 1]) {
                //indices.push(text[m - 1]);
                indices.push(m - 1);
                n -= 1;
                m -= 1;
            } else if (mat[n - 1][m] >= mat[n][m - 1]) {
                n -= 1;
            } else {
                m -= 1;
            }
        }
        return indices.reverse();
    }


    /**
     * Creates a m+1 x n+1 matrix with all element
     * set to zero.
     * @param n: length of the search term
     * @param m: length of the text
     * @returns: 2D array
     */
    function initMat(n, m) {
        var matrix = [];
        for (var i = 0; i < n + 1; i++) {
            matrix[i] = [];
            for (var j = 0; j < m + 1; j++) {
                matrix[i][j] = 0;
            }
        }
        return matrix;
    }

    /**
     * Compares the letters and fill up the matrix according to LCS:
     * if equal      -> insert top-left + 1
     * if not equal  -> insert max(top, left)
     * @param sub
     * @param text
     * @returns: 2D array
     */
    function populateMat(sub, text) {
        var n = sub.length,
            m = text.length;
        var mat = initMat(n, m);
        for (var j = 0; j < n; j++) {
            for (var k = 0; k < m; k++) {
                if (sub[j] === text[k]) {
                    mat[j + 1][k + 1] = mat[j][k] + 1;
                } else {
                    mat[j + 1][k + 1] = Math.max(mat[j][k + 1], mat[j + 1][k]);
                }

            }
        }
        return mat;
    }

    /**
     * Simply prints each row of the matrix
     * @param mat: 2D array
     */
    function printMat(mat) {
        mat.forEach(function (row) {
            console.log(row);
        });
    }

    /**
     *
     * @param sub: search term
     * @param text: text to be searched
     * @returns: list of indices if matched, [] of not
     */
    lcs.fuzzy = function (sub, text) {
        sub = sub.toLowerCase();
        text = text.toLowerCase();
        return getMatch(sub, text);
    };

}(window.lcs = window.lcs || {}));