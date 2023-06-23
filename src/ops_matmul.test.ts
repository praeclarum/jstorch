import { ones } from "./factories";
import { tensor, matmul } from "./ops_artisanal";

test("matmul (2,) x (1,)", async () => {
    const a = ones([2]);
    const b = ones([1]);
    expect(() => matmul(a, b)).toThrow('inconsistent tensor size, expected tensor [2] and src [1] to have the same number of elements, but got 2 and 1 elements respectively');
});
test("matmul (2,) x (1, 1)", async () => {
    const a = ones([2]);
    const b = ones([1, 1]);
    expect(() => matmul(a, b)).toThrow('mat1 and mat2 shapes cannot be multiplied (1x2 and 1x1)');
});
test("matmul (2,) x (1, 1, 3)", async () => {
    const a = ones([2]);
    const b = ones([1, 1, 3]);
    expect(() => matmul(a, b)).toThrow('size mismatch, got 3, 3x1,2');
});
test("matmul (2,) x (2, 1)", async () => {
    const a = tensor([39.0, -34.0]);
    expect(a.shape).toEqual([2]);
    const b = tensor([[-19.0], [-200.0]]);
    expect(b.shape).toEqual([2, 1]);
    const c = matmul(a, b);
    expect(c.shape).toEqual([1]);
    expect(await c.toArrayAsync()).toEqual([6059.0]);
});
test("matmul (2,) x (2, 1, 3)", async () => {
    const a = ones([2]);
    const b = ones([2, 1, 3]);
    expect(() => matmul(a, b)).toThrow('size mismatch, got 6, 6x1,2');
});
test("matmul (2,) x (2,)", async () => {
    const a = tensor([-12.0, -334.0]);
    expect(a.shape).toEqual([2]);
    const b = tensor([63.0, 22.0]);
    expect(b.shape).toEqual([2]);
    const c = matmul(a, b);
    expect(c.shape).toEqual([]);
    expect(await c.toArrayAsync()).toEqual(-8104.0);
});
test("matmul (2,) x (2, 3)", async () => {
    const a = tensor([22.0, 145.0]);
    expect(a.shape).toEqual([2]);
    const b = tensor([[55.0, -2.0, -25.0], [-127.0, 152.0, 2.0]]);
    expect(b.shape).toEqual([2, 3]);
    const c = matmul(a, b);
    expect(c.shape).toEqual([3]);
    expect(await c.toArrayAsync()).toEqual([-17205.0, 21996.0, -260.0]);
});
test("matmul (1, 2) x (1,)", async () => {
    const a = ones([1, 2]);
    const b = ones([1]);
    expect(() => matmul(a, b)).toThrow('size mismatch, got 1, 1x2,1');
});
test("matmul (1, 2) x (1, 3)", async () => {
    const a = ones([1, 2]);
    const b = ones([1, 3]);
    expect(() => matmul(a, b)).toThrow('mat1 and mat2 shapes cannot be multiplied (1x2 and 1x3)');
});
test("matmul (1, 2) x (2, 1)", async () => {
    const a = tensor([[-148.0, 100.0]]);
    expect(a.shape).toEqual([1, 2]);
    const b = tensor([[9.0], [-68.0]]);
    expect(b.shape).toEqual([2, 1]);
    const c = matmul(a, b);
    expect(c.shape).toEqual([1, 1]);
    expect(await c.toArrayAsync()).toEqual([[-8132.0]]);
});
test("matmul (1, 2) x (2, 1, 1)", async () => {
    const a = ones([1, 2]);
    const b = ones([2, 1, 1]);
    expect(() => matmul(a, b)).toThrow('mat1 and mat2 shapes cannot be multiplied (2x1 and 2x1)');
});
test("matmul (1, 2) x (2, 1, 3)", async () => {
    const a = ones([1, 2]);
    const b = ones([2, 1, 3]);
    expect(() => matmul(a, b)).toThrow('mat1 and mat2 shapes cannot be multiplied (6x1 and 2x1)');
});
test("matmul (1, 2) x (2,)", async () => {
    const a = tensor([[39.0, 122.0]]);
    expect(a.shape).toEqual([1, 2]);
    const b = tensor([-140.0, -82.0]);
    expect(b.shape).toEqual([2]);
    const c = matmul(a, b);
    expect(c.shape).toEqual([1]);
    expect(await c.toArrayAsync()).toEqual([-15464.0]);
});
test("matmul (1, 2) x (2, 3)", async () => {
    const a = tensor([[-14.0, -116.0]]);
    expect(a.shape).toEqual([1, 2]);
    const b = tensor([[176.0, 54.0, -60.0], [52.0, -31.0, -63.0]]);
    expect(b.shape).toEqual([2, 3]);
    const c = matmul(a, b);
    expect(c.shape).toEqual([1, 3]);
    expect(await c.toArrayAsync()).toEqual([[-8496.0, 2840.0, 8148.0]]);
});
test("matmul (2, 2) x (1,)", async () => {
    const a = ones([2, 2]);
    const b = ones([1]);
    expect(() => matmul(a, b)).toThrow('size mismatch, got 2, 2x2,1');
});
test("matmul (1, 2, 3) x (3,)", async () => {
    const a = tensor([[[-61.0, -62.0, 177.0], [-13.0, 203.0, 17.0]]]);
    expect(a.shape).toEqual([1, 2, 3]);
    const b = tensor([44.0, -4.0, -32.0]);
    expect(b.shape).toEqual([3]);
    const c = matmul(a, b);
    expect(c.shape).toEqual([1, 2]);
    expect(await c.toArrayAsync()).toEqual([[-8100.0, -1928.0]]);
});
test("matmul (1, 2, 3) x (3, 1)", async () => {
    const a = tensor([[[19.0, 47.0, -91.0], [-15.0, -20.0, -205.0]]]);
    expect(a.shape).toEqual([1, 2, 3]);
    const b = tensor([[46.0], [0.0], [-43.0]]);
    expect(b.shape).toEqual([3, 1]);
    const c = matmul(a, b);
    expect(c.shape).toEqual([1, 2, 1]);
    expect(await c.toArrayAsync()).toEqual([[[4787.0], [8125.0]]]);
});
test("matmul (1, 2, 3, 5) x (2, 5)", async () => {
    const a = ones([1, 2, 3, 5]);
    const b = ones([2, 5]);
    expect(() => matmul(a, b)).toThrow('mat1 and mat2 shapes cannot be multiplied (6x5 and 2x5)');
});
test("matmul (2, 2, 3, 5) x (5,)", async () => {
    const a = tensor([[[[-24.0, 121.0, -56.0, 103.0, 23.0], [-103.0, -78.0, 125.0, -5.0, 68.0], [-22.0, 17.0, 119.0, -82.0, -169.0]], [[197.0, 137.0, -100.0, 23.0, 30.0], [-152.0, -139.0, 102.0, 47.0, -14.0], [-178.0, 49.0, 100.0, 16.0, 150.0]]], [[[63.0, 17.0, -68.0, -144.0, -47.0], [-27.0, -5.0, 221.0, 14.0, 110.0], [-97.0, 29.0, -164.0, 72.0, -70.0]], [[118.0, -79.0, 107.0, 105.0, -17.0], [-197.0, -60.0, -60.0, 69.0, -14.0], [-104.0, -20.0, 106.0, 13.0, 95.0]]]]);
    expect(a.shape).toEqual([2, 2, 3, 5]);
    const b = tensor([64.0, 26.0, 115.0, -229.0, -153.0]);
    expect(b.shape).toEqual([5]);
    const c = matmul(a, b);
    expect(c.shape).toEqual([2, 2, 3]);
    expect(await c.toArrayAsync()).toEqual([[[-31936.0, -3504.0, 57354.0], [-5187.0, -10233.0, -25232.0]], [[36821.0, 3521.0, -30092.0], [-3641.0, -34727.0, -12498.0]]]);
});
test("matmul (2, 2, 3, 5) x (5, 7)", async () => {
    const a = tensor([[[[158.0, -49.0, -40.0, -55.0, 107.0], [-169.0, -12.0, -28.0, 40.0, 28.0], [-39.0, 125.0, -92.0, 7.0, -111.0]], [[-112.0, -194.0, 13.0, 171.0, 84.0], [135.0, -62.0, 7.0, -91.0, -63.0], [-226.0, 53.0, 109.0, -62.0, 54.0]]], [[[39.0, 134.0, -75.0, -54.0, 9.0], [-82.0, 9.0, -31.0, 86.0, -159.0], [-91.0, 75.0, 73.0, 64.0, -14.0]], [[25.0, 93.0, 140.0, -134.0, 103.0], [-92.0, -31.0, -41.0, 100.0, 121.0], [-22.0, 9.0, -40.0, 168.0, -89.0]]]]);
    expect(a.shape).toEqual([2, 2, 3, 5]);
    const b = tensor([[-34.0, 70.0, 4.0, 63.0, 70.0, -147.0, -32.0], [35.0, -88.0, -41.0, -85.0, -179.0, -40.0, 152.0], [-25.0, -129.0, 199.0, -86.0, 96.0, -65.0, -7.0], [42.0, -67.0, 45.0, 33.0, -128.0, -32.0, 139.0], [-70.0, -149.0, 121.0, -190.0, -101.0, 18.0, -33.0]]);
    expect(b.shape).toEqual([5, 7]);
    const c = matmul(a, b);
    expect(c.shape).toEqual([2, 2, 3, 7]);
    expect(await c.toArrayAsync()).toEqual([[[[-15887.0, 8274.0, 5153.0, -4586.0, 12224.0, -14980.0, -23400.0], [5746.0, -14014.0, -568.0, -11219.0, -20318.0, 26367.0, 8416.0], [16065.0, 14208.0, -36705.0, 16151.0, -23622.0, 4491.0, 25528.0]], [[-2005.0, -16418.0, 27952.0, -2001.0, -2238.0, 19419.0, -4998.0], [-6347.0, 29487.0, -7243.0, 22140.0, 39231.0, -16042.0, -24363.0], [430.0, -38437.0, 22358.0, -40423.0, -12361.0, 26973.0, 4125.0]]], [[[2341.0, 2890.0, -21604.0, -5975.0, -22453.0, -4328.0, 11842.0], [18620.0, 15396.0, -22235.0, 29783.0, -5276.0, 8095.0, 21410.0], [7562.0, -24589.0, 12274.0, -13614.0, -19565.0, 3332.0, 23159.0]], [[-13933.0, -30863.0, 30580.0, -42362.0, 5292.0, -10353.0, -9669.0], [-1202.0, -23152.0, 11885.0, -19325.0, -29848.0, 16407.0, 8426.0], [15349.0, 4833.0, -11626.0, 23743.0, -19506.0, -1504.0, 28641.0]]]]);
});
test("matmul (2, 2, 3, 5, 7) x (2, 7, 1)", async () => {
    const a = ones([2, 2, 3, 5, 7]);
    const b = ones([2, 7, 1]);
    expect(() => matmul(a, b)).toThrow('The size of tensor a (3) must match the size of tensor b (2) at non-singleton dimension 2');
});
test("matmul (2, 2, 3, 5, 7) x (2, 7, 11)", async () => {
    const a = ones([2, 2, 3, 5, 7]);
    const b = ones([2, 7, 11]);
    expect(() => matmul(a, b)).toThrow('The size of tensor a (3) must match the size of tensor b (2) at non-singleton dimension 2');
});
test("matmul (2, 1, 2, 3, 5, 7) x (7, 11)", async () => {
    const a = tensor([[[[[[73.0, 31.0, -131.0, 112.0, 11.0, 14.0, -28.0], [-33.0, -19.0, 38.0, 138.0, -85.0, 23.0, 131.0], [-44.0, -15.0, 72.0, -84.0, 109.0, -229.0, -32.0], [-109.0, -44.0, -37.0, -92.0, -78.0, -222.0, -56.0], [-50.0, -83.0, 10.0, 114.0, 126.0, -154.0, 78.0]], [[-12.0, -130.0, -155.0, -58.0, -112.0, -88.0, 45.0], [6.0, 33.0, 83.0, 47.0, 48.0, -161.0, 43.0], [-110.0, -160.0, 266.0, 37.0, -36.0, -184.0, -43.0], [-126.0, 7.0, 93.0, -0.0, 30.0, -209.0, 135.0], [-85.0, 38.0, 103.0, -132.0, 9.0, -166.0, -50.0]], [[167.0, 19.0, 93.0, -101.0, 27.0, -28.0, 35.0], [-73.0, 112.0, -16.0, -64.0, 19.0, 247.0, 72.0], [71.0, 50.0, -133.0, -45.0, -23.0, 47.0, 147.0], [9.0, -12.0, 10.0, -181.0, 10.0, -63.0, -13.0], [-41.0, 7.0, 159.0, 23.0, -94.0, -10.0, 96.0]]], [[[-22.0, 58.0, -43.0, 49.0, 72.0, 8.0, 210.0], [6.0, 85.0, 114.0, 14.0, 52.0, -64.0, -46.0], [43.0, 43.0, -37.0, -125.0, -18.0, 71.0, 76.0], [128.0, -22.0, -34.0, 73.0, -231.0, -52.0, -44.0], [-61.0, 49.0, -140.0, 64.0, -68.0, 30.0, -70.0]], [[134.0, -113.0, -65.0, 146.0, 34.0, 210.0, 183.0], [-41.0, 97.0, -208.0, -186.0, -30.0, 196.0, 11.0], [21.0, 121.0, -47.0, -86.0, -180.0, 16.0, -156.0], [126.0, -42.0, -73.0, 122.0, 168.0, 39.0, -47.0], [84.0, -21.0, 75.0, 16.0, -107.0, -80.0, -168.0]], [[-7.0, -56.0, 52.0, -45.0, 187.0, 34.0, -2.0], [-219.0, 15.0, -101.0, -301.0, 327.0, -203.0, -33.0], [-2.0, -34.0, -60.0, -55.0, 25.0, -99.0, 146.0], [35.0, -87.0, -170.0, 6.0, 27.0, -42.0, -21.0], [16.0, 130.0, 32.0, 42.0, -41.0, 121.0, -116.0]]]]], [[[[[27.0, 52.0, -75.0, -23.0, 93.0, -156.0, 199.0], [-112.0, 87.0, 18.0, -123.0, 164.0, 38.0, 12.0], [-62.0, -136.0, -178.0, -102.0, -17.0, -53.0, 96.0], [88.0, -141.0, -4.0, 60.0, 28.0, -121.0, 43.0], [-85.0, 64.0, 18.0, 102.0, -6.0, 76.0, 25.0]], [[210.0, 59.0, 40.0, -29.0, 29.0, 155.0, -179.0], [97.0, -139.0, -143.0, 26.0, 39.0, 2.0, 85.0], [-130.0, 34.0, 78.0, 76.0, -171.0, -80.0, -119.0], [66.0, 156.0, -53.0, 158.0, 99.0, 50.0, -36.0], [-63.0, -169.0, -64.0, -35.0, 17.0, 53.0, -110.0]], [[153.0, -64.0, 28.0, -122.0, -121.0, -81.0, 37.0], [5.0, 20.0, -29.0, -22.0, 30.0, -53.0, -95.0], [36.0, -20.0, 22.0, 133.0, -54.0, -195.0, -44.0], [-155.0, 140.0, -19.0, 5.0, -122.0, -46.0, -18.0], [-42.0, -46.0, -180.0, -24.0, -16.0, -51.0, 21.0]]], [[[-24.0, -135.0, -91.0, 46.0, -117.0, 139.0, -47.0], [68.0, 66.0, 80.0, -29.0, -29.0, 113.0, -13.0], [41.0, -18.0, -105.0, -23.0, 16.0, 5.0, -70.0], [-4.0, 54.0, -30.0, -24.0, 109.0, -50.0, 90.0], [27.0, -98.0, 34.0, -68.0, 22.0, -68.0, 219.0]], [[-9.0, -135.0, 58.0, -13.0, 175.0, 84.0, -18.0], [194.0, 56.0, 0.0, -22.0, -66.0, 81.0, 113.0], [-7.0, 255.0, -34.0, -22.0, -126.0, 110.0, 70.0], [29.0, -79.0, -122.0, -45.0, 41.0, 115.0, -39.0], [150.0, 185.0, -126.0, -63.0, -164.0, 29.0, 126.0]], [[187.0, 14.0, -47.0, 172.0, -147.0, 36.0, -19.0], [90.0, 23.0, 4.0, -75.0, 141.0, 167.0, -27.0], [54.0, -24.0, -36.0, -106.0, 165.0, 103.0, 24.0], [30.0, -3.0, 173.0, -149.0, 94.0, 42.0, 98.0], [-3.0, 35.0, -59.0, -57.0, 134.0, 68.0, 30.0]]]]]]);
    expect(a.shape).toEqual([2, 1, 2, 3, 5, 7]);
    const b = tensor([[72.0, 105.0, 17.0, -136.0, -120.0, 83.0, -110.0, -49.0, 66.0, 69.0, 24.0], [58.0, 48.0, -28.0, -52.0, 132.0, -58.0, 118.0, -5.0, -56.0, 91.0, 31.0], [-141.0, 12.0, 208.0, -45.0, -21.0, -38.0, -32.0, 175.0, 92.0, 73.0, -53.0], [-33.0, -4.0, -28.0, -30.0, -12.0, 55.0, -5.0, -37.0, -7.0, 39.0, 27.0], [12.0, -126.0, 27.0, -16.0, 5.0, -145.0, -12.0, -30.0, 86.0, 133.0, -75.0], [-129.0, 10.0, -6.0, -62.0, 188.0, 41.0, 99.0, 64.0, 26.0, -163.0, 150.0], [9.0, -61.0, 49.0, 139.0, -67.0, 134.0, -34.0, 27.0, -74.0, -116.0, 59.0]]);
    expect(b.shape).toEqual([7, 11]);
    const c = matmul(a, b);
    expect(c.shape).toEqual([2, 1, 2, 3, 5, 11]);
    expect(await c.toArrayAsync()).toEqual([[[[[[19903.0, 7595.0, -31170.0, -13941.0, 1302.0, 10626.0, 1466.0, -30991.0, -6372.0, 5092.0, 12303.0], [-16198.0, -1524.0, 7997.0, 17769.0, -5880.0, 35331.0, -1675.0, 10815.0, -14990.0, -26100.0, 17885.0], [19143.0, -18212.0, 19749.0, 14050.0, -37567.0, -39620.0, -21705.0, -851.0, 10936.0, 53115.0, -52018.0], [25051.0, -2609.0, -9259.0, 28765.0, -29221.0, -15445.0, -10696.0, -10890.0, -15826.0, 14494.0, -35257.0], [8494.0, -31744.0, 8510.0, 25620.0, -40082.0, -7578.0, -24594.0, -11133.0, 2530.0, 26985.0, -29173.0]], [[25778.0, 1359.0, -27471.0, 30610.0, -31888.0, 27906.0, -17668.0, -24798.0, -22616.0, -32007.0, 186.0], [10824.0, -7259.0, 19495.0, 7514.0, -31580.0, -9784.0, -17634.0, 1744.0, 2615.0, 38948.0, -27176.0], [-33010.0, -10867.0, 54927.0, 16207.0, -45841.0, -16009.0, -31799.0, 39514.0, 21215.0, 28903.0, -48136.0], [6757.0, -25883.0, 25685.0, 43830.0, -34096.0, -9227.0, -13931.0, 11783.0, -12996.0, 21129.0, -33371.0], [6989.0, -5081.0, 21400.0, 12107.0, -13176.0, -35244.0, -3644.0, 14640.0, 2820.0, 34019.0, -38410.0]], [[7597.0, 14150.0, 27091.0, -18686.0, -25747.0, 3297.0, -22885.0, 10077.0, 18225.0, 20197.0, -7219.0], [-25379.0, -6541.0, -3354.0, 1134.0, 66355.0, 1553.0, 43855.0, 19767.0, -9386.0, -44595.0, 40713.0], [23234.0, 2840.0, -20297.0, 12966.0, 285.0, 30532.0, 2502.0, -17672.0, -21669.0, -29787.0, 26536.0], [12645.0, 116.0, 7648.0, 6319.0, -11625.0, -14667.0, -7736.0, 3383.0, 3637.0, 6307.0, -16540.0], [-24698.0, 3735.0, 33761.0, 12835.0, -6553.0, 17498.0, -2993.0, 33720.0, -4079.0, -11696.0, 2641.0]]], [[[7948.0, -22040.0, -128.0, 27983.0, -1595.0, 17167.0, 3183.0, -4528.0, -18139.0, -13556.0, 13062.0], [-2708.0, 1636.0, 20576.0, -14044.0, -752.0, -24322.0, 256.0, 11815.0, 12238.0, 39701.0, -19099.0], [6241.0, 4977.0, -1857.0, 3781.0, 10959.0, 11311.0, 6814.0, 2964.0, -7425.0, -23479.0, 17435.0], [13865.0, 42954.0, -14405.0, -16120.0, -26409.0, 42674.0, -16833.0, -12399.0, -11921.0, -9948.0, 13092.0], [10762.0, 7149.0, -38767.0, -374.0, 25950.0, 2645.0, 22818.0, -22054.0, -19986.0, -13288.0, 14673.0]], [[-17594.0, -6065.0, -3541.0, -1930.0, -3994.0, 56378.0, -12564.0, -5417.0, 3012.0, -51024.0, 46847.0], [12595.0, 3668.0, -42916.0, 5329.0, 60285.0, 2505.0, 42932.0, -14253.0, -24270.0, -53654.0, 40324.0], [12367.0, 40149.0, -22999.0, -24249.0, 28031.0, -2367.0, 22950.0, -4465.0, -12632.0, -2777.0, 11120.0], [9465.0, -8061.0, -13283.0, -26966.0, -9274.0, -6681.0, -13647.0, -27066.0, 22038.0, 25740.0, -638.0], [1251.0, 31578.0, 6527.0, -30867.0, -18938.0, -4057.0, -15122.0, 2076.0, 14658.0, 28281.0, -16065.0]], [[-11759.0, -25719.0, 18272.0, -2504.0, 357.0, -27773.0, -6087.0, 7900.0, 24887.0, 16023.0, -14918.0], [39090.0, -63502.0, -8293.0, 45346.0, -325.0, -91924.0, 7698.0, -19575.0, 2807.0, 47550.0, -64487.0], [22544.0, -15388.0, -1599.0, 32422.0, -30597.0, 12941.0, -16662.0, -11341.0, -14591.0, -7231.0, -7518.0], [26799.0, -5106.0, -32545.0, 6487.0, -18540.0, 6290.0, -12474.0, -35317.0, -5716.0, -4805.0, -2249.0], [-14351.0, 21588.0, -5405.0, -34606.0, 44379.0, -9756.0, 28761.0, 8454.0, 4630.0, 5188.0, 18233.0]]]]], [[[[[39325.0, -20894.0, -2755.0, 33534.0, -36721.0, 7595.0, -17645.0, -21258.0, -18653.0, 14936.0, -13020.0], [-4323.0, -27892.0, 7636.0, 10276.0, 33182.0, -42405.0, 24011.0, 10590.0, 4457.0, 10932.0, -10158.0], [23609.0, -19010.0, -26851.0, 43476.0, -22031.0, 17052.0, -11329.0, -23948.0, -22082.0, -38384.0, -35.0], [13074.0, -5177.0, 6521.0, 6775.0, -55297.0, 15675.0, -40267.0, -13950.0, 8996.0, 13748.0, -18140.0], [-17963.0, -6054.0, -1742.0, 3221.0, 29629.0, 1495.0, 22562.0, 8940.0, -8642.0, -10835.0, 15069.0]], [[-7399.0, 34293.0, 2132.0, -67513.0, 23374.0, -10943.0, 3810.0, 1705.0, 34209.0, 21004.0, 14480.0], [19202.0, -8386.0, -19725.0, 10758.0, -32421.0, 28794.0, -25786.0, -28792.0, -2036.0, -20380.0, 8690.0], [-13697.0, 16619.0, 966.0, 1277.0, 9616.0, -5977.0, 13614.0, 13835.0, -11820.0, 6883.0, -10344.0], [10473.0, 3372.0, -18085.0, -29131.0, 24196.0, -9995.0, 17040.0, -19877.0, 2116.0, 30236.0, 11446.0], [-11782.0, -10257.0, -13920.0, 2438.0, 4435.0, -9952.0, -2006.0, -6061.0, 10643.0, -19381.0, -4119.0]], [[16712.0, 25996.0, 12665.0, -2979.0, -44244.0, 27819.0, -32493.0, 1682.0, 1862.0, -5163.0, -3982.0], [12677.0, 2710.0, -9418.0, -10154.0, -536.0, -20106.0, 471.0, -11463.0, 4928.0, 22839.0, -14122.0], [18052.0, 10090.0, -420.0, -1998.0, -43000.0, 4566.0, -24850.0, -14783.0, -1869.0, 37164.0, -25127.0], [3782.0, 6207.0, -14547.0, 16807.0, 29367.0, -6596.0, 31675.0, 3615.0, -30209.0, -5787.0, 2950.0], [27056.0, -8457.0, -35291.0, 23261.0, -8039.0, 7745.0, -499.0, -30541.0, -20844.0, -17411.0, 1247.0]]], [[[-18003.0, 8723.0, -23140.0, -280.0, 15115.0, 28192.0, 6155.0, -4639.0, -5688.0, -51556.0, 28156.0], [-16641.0, 16961.0, 14662.0, -23759.0, 21190.0, 4277.0, 9870.0, 19162.0, 9761.0, -5361.0, 17013.0], [16389.0, 4577.0, -23023.0, -9521.0, 895.0, -4323.0, -476.0, -21493.0, 901.0, 2062.0, 790.0], [16434.0, -17816.0, 505.0, 13672.0, -6359.0, -9439.0, -1426.0, -8476.0, -4466.0, 13719.0, -7845.0], [4717.0, -18000.0, 23912.0, 36239.0, -43421.0, 26261.0, -29724.0, 8534.0, -5208.0, -18619.0, -4957.0]], [[-25125.0, -26789.0, 19394.0, -4486.0, 71.0, -20179.0, -9903.0, 11387.0, 30959.0, 2492.0, -9413.0], [7718.0, 25379.0, 5615.0, -16895.0, -8297.0, 39677.0, -9653.0, 1243.0, -2110.0, -17465.0, 29565.0], [4734.0, 23891.0, -14347.0, -5192.0, 50838.0, 16871.0, 42080.0, 6642.0, -30872.0, -23426.0, 39025.0], [1499.0, -3668.0, -22905.0, -6203.0, 13632.0, 2694.0, 3836.0, -15634.0, 4831.0, -24617.0, 15372.0], [36800.0, 36638.0, -25502.0, -4120.0, 6012.0, 44896.0, 10232.0, -17816.0, -34285.0, -25625.0, 38396.0]], [[8648.0, 39096.0, -16921.0, -31726.0, -14363.0, 46200.0, -12300.0, -17621.0, -4270.0, -5761.0, 27361.0], [-10369.0, -3547.0, 5300.0, -27729.0, 26962.0, -15357.0, 8820.0, 4679.0, 24011.0, 334.0, 13518.0], [-21.0, -16714.0, 2083.0, -6986.0, 10961.0, -15074.0, 311.0, -2614.0, 17430.0, -2848.0, 4089.0], [-20898.0, -11724.0, 47838.0, 2275.0, -4041.0, -10881.0, -8747.0, 36847.0, 21031.0, 2903.0, -7533.0], [5120.0, -17149.0, -7027.0, 763.0, 18347.0, -15794.0, 10737.0, -7102.0, 3885.0, -294.0, 4521.0]]]]]]);
});
test("matmul (2, 1, 2, 3, 5, 7) x (1, 7, 1)", async () => {
    const a = tensor([[[[[[-76.0, 94.0, -106.0, -45.0, 31.0, 4.0, -39.0], [-91.0, -130.0, 98.0, 18.0, -124.0, 172.0, 41.0], [56.0, -98.0, 182.0, -6.0, -18.0, 53.0, -46.0], [-101.0, -56.0, 1.0, 19.0, 100.0, -185.0, -41.0], [-201.0, 62.0, -138.0, 99.0, -54.0, 82.0, 51.0]], [[106.0, -151.0, -26.0, -56.0, -40.0, -120.0, 5.0], [62.0, 18.0, 21.0, 10.0, 10.0, 36.0, -25.0], [229.0, -128.0, 8.0, -7.0, 136.0, -79.0, 184.0], [-1.0, -41.0, 140.0, 82.0, 15.0, 114.0, 46.0], [29.0, 38.0, 40.0, -42.0, -16.0, -143.0, -32.0]], [[10.0, 197.0, -64.0, 161.0, -164.0, 69.0, 59.0], [-5.0, 94.0, 78.0, 76.0, 4.0, 53.0, -177.0], [73.0, -209.0, 117.0, 256.0, 61.0, -84.0, 0.0], [18.0, -151.0, 140.0, 132.0, 25.0, -54.0, -268.0], [44.0, 36.0, -147.0, 30.0, 5.0, -7.0, 246.0]]], [[[78.0, -23.0, 28.0, -125.0, 158.0, 67.0, 12.0], [-81.0, -102.0, 116.0, 78.0, -145.0, 143.0, -291.0], [-6.0, -159.0, 114.0, 88.0, 162.0, -2.0, 79.0], [121.0, -73.0, -5.0, 49.0, -106.0, -198.0, 76.0], [189.0, 185.0, 69.0, 96.0, 92.0, -86.0, 26.0]], [[66.0, -155.0, -36.0, 65.0, -77.0, 46.0, -97.0], [-16.0, -98.0, -116.0, -200.0, 14.0, -47.0, 113.0], [-61.0, 133.0, 60.0, -88.0, 72.0, 143.0, 14.0], [-31.0, -132.0, -69.0, 34.0, -65.0, -114.0, 52.0], [166.0, -53.0, -15.0, -16.0, 28.0, -114.0, 40.0]], [[-93.0, 81.0, -61.0, 16.0, 8.0, 14.0, -11.0], [96.0, -15.0, -18.0, -67.0, -142.0, -106.0, -24.0], [-75.0, -210.0, 48.0, -15.0, 15.0, 94.0, -30.0], [-50.0, 24.0, 58.0, -53.0, -34.0, 39.0, 51.0], [-21.0, 80.0, -71.0, -17.0, -249.0, -114.0, 108.0]]]]], [[[[[190.0, 30.0, -84.0, 31.0, -111.0, 20.0, 72.0], [-55.0, 10.0, -26.0, -102.0, 41.0, -152.0, 35.0], [-115.0, -43.0, -22.0, 31.0, -77.0, 90.0, 50.0], [-89.0, -79.0, -78.0, 222.0, -16.0, -21.0, -16.0], [46.0, 58.0, 17.0, -11.0, 34.0, 38.0, 193.0]], [[-123.0, 13.0, 126.0, 32.0, 54.0, -86.0, 31.0], [-31.0, -367.0, 48.0, 52.0, 200.0, 119.0, -51.0], [103.0, 94.0, 36.0, -75.0, -49.0, -151.0, -27.0], [-5.0, -71.0, 82.0, 16.0, 33.0, 48.0, -214.0], [-76.0, -125.0, 23.0, 16.0, -42.0, -25.0, -32.0]], [[-53.0, 20.0, -65.0, -123.0, -52.0, 2.0, -48.0], [-25.0, -46.0, -7.0, -127.0, 15.0, -72.0, -44.0], [2.0, 26.0, -32.0, -167.0, -18.0, 108.0, -29.0], [-42.0, -40.0, 90.0, 111.0, 24.0, -35.0, 68.0], [54.0, -109.0, -34.0, -58.0, -9.0, 122.0, -168.0]]], [[[-90.0, -163.0, 166.0, -154.0, -94.0, 17.0, -90.0], [16.0, 115.0, 74.0, -33.0, -19.0, -28.0, 16.0], [-29.0, 4.0, -80.0, 55.0, -88.0, 260.0, -46.0], [-159.0, 16.0, -148.0, 67.0, -106.0, -19.0, -162.0], [-38.0, 205.0, -46.0, -55.0, -60.0, -36.0, 72.0]], [[-53.0, 93.0, 232.0, -43.0, 61.0, 41.0, -153.0], [67.0, 79.0, 77.0, 41.0, -139.0, -94.0, -68.0], [-8.0, 44.0, -14.0, 36.0, -42.0, 9.0, 58.0], [57.0, 49.0, 75.0, 8.0, 22.0, -76.0, -22.0], [111.0, 91.0, 104.0, -74.0, -175.0, 199.0, -72.0]], [[25.0, 57.0, -141.0, 91.0, 20.0, 126.0, -86.0], [-9.0, 117.0, -135.0, -147.0, 70.0, -109.0, -51.0], [-31.0, -121.0, 78.0, -79.0, 30.0, 15.0, 17.0], [26.0, -196.0, 9.0, 129.0, 290.0, -119.0, 6.0], [57.0, -37.0, -64.0, -101.0, -30.0, -19.0, -84.0]]]]]]);
    expect(a.shape).toEqual([2, 1, 2, 3, 5, 7]);
    const b = tensor([[[-29.0], [35.0], [74.0], [136.0], [65.0], [93.0], [-59.0]]]);
    expect(b.shape).toEqual([1, 7, 1]);
    const c = matmul(a, b);
    expect(c.shape).toEqual([2, 1, 2, 3, 5, 1]);
    expect(await c.toArrayAsync()).toEqual([[[[[[-3782.0], [13306.0], [14071.0], [-4659.0], [12358.0]], [[-31954.0], [7219.0], [-20844.0], [28969.0], [-14714.0]], [[16041.0], [35175.0], [30195.0], [34920.0], [-21654.0]]], [[[-2202.0], [39014.0], [20696.0], [-29558.0], [15604.0]], [[3833.0], [-48878.0], [16049.0], [-22098.0], [-21097.0]], [[5665.0], [-31425.0], [7824.0], [-2218.0], [-37316.0]]]]], [[[[[-16063.0], [-27387.0], [4833.0], [22187.0], [-5185.0]], [[11381.0], [25754.0], [-22868.0], [25139.0], [-1460.0]], [[-19663.0], [-21800.0], [-13643.0], [15867.0], [4888.0]]], [[[-10974.0], [-234.0], [23715.0], [4232.0], [-14103.0]], [[32917.0], [-1669.0], [317.0], [2360.0], [8978.0]], [[21304.0], [-28204.0], [-5966.0], [18025.0], [-20181.0]]]]]]);
});
test("matmul (2, 1, 2, 3, 5, 7) x (1, 7, 11)", async () => {
    const a = tensor([[[[[[5.0, 77.0, 119.0, -31.0, -3.0, -192.0, -76.0], [-74.0, 4.0, 7.0, -52.0, 59.0, -49.0, -59.0], [49.0, -186.0, 245.0, -59.0, 140.0, 261.0, -104.0], [17.0, -61.0, -136.0, 48.0, 38.0, -37.0, -66.0], [21.0, 18.0, 8.0, -22.0, 95.0, -18.0, 38.0]], [[119.0, 42.0, -33.0, -231.0, -66.0, 36.0, -196.0], [-93.0, -50.0, 124.0, -28.0, -13.0, -27.0, 106.0], [11.0, 67.0, 18.0, 9.0, 40.0, -18.0, -109.0], [74.0, 2.0, -0.0, 106.0, 89.0, 93.0, 1.0], [18.0, -100.0, 149.0, -145.0, -88.0, 113.0, -44.0]], [[91.0, -157.0, -120.0, 60.0, 90.0, 4.0, 76.0], [62.0, -7.0, 139.0, -210.0, 6.0, 110.0, -108.0], [-16.0, -36.0, -23.0, 151.0, 289.0, 77.0, -66.0], [-95.0, 18.0, 50.0, 94.0, -112.0, 38.0, -82.0], [82.0, 109.0, 94.0, -17.0, -6.0, 73.0, -41.0]]], [[[56.0, 189.0, 79.0, -4.0, -66.0, 104.0, -28.0], [-41.0, 118.0, 4.0, -25.0, 98.0, 116.0, -217.0], [180.0, 27.0, 34.0, 59.0, -56.0, -12.0, -153.0], [-45.0, 30.0, 77.0, 31.0, 77.0, 116.0, -162.0], [-56.0, 37.0, -210.0, 36.0, -89.0, 54.0, -192.0]], [[-26.0, -40.0, 112.0, -20.0, -52.0, 168.0, 26.0], [0.0, 170.0, -70.0, 70.0, 43.0, -158.0, 3.0], [-47.0, 9.0, -58.0, 85.0, -67.0, 122.0, -29.0], [-67.0, 107.0, 197.0, -116.0, -79.0, 122.0, -80.0], [19.0, 44.0, -61.0, -42.0, -74.0, -22.0, -25.0]], [[-75.0, -108.0, -2.0, 214.0, -35.0, 48.0, 33.0], [23.0, 146.0, -18.0, 123.0, -32.0, -51.0, 178.0], [53.0, -48.0, 46.0, -13.0, -56.0, -164.0, -68.0], [-32.0, -6.0, -35.0, 402.0, -39.0, 127.0, 34.0], [58.0, 121.0, 274.0, 113.0, -161.0, 31.0, -155.0]]]]], [[[[[-22.0, 18.0, 68.0, 52.0, -150.0, -25.0, 60.0], [17.0, 67.0, -21.0, 56.0, 126.0, -28.0, 156.0], [-174.0, -10.0, -64.0, -124.0, 122.0, -46.0, 29.0], [27.0, 37.0, 59.0, -79.0, -103.0, -88.0, -50.0], [85.0, -55.0, -35.0, -15.0, -83.0, -26.0, -170.0]], [[173.0, -30.0, 80.0, 92.0, 70.0, -5.0, -108.0], [-85.0, 70.0, 125.0, 173.0, -35.0, -38.0, -39.0], [240.0, 145.0, -102.0, -92.0, -30.0, 5.0, -49.0], [7.0, -4.0, -23.0, -289.0, -113.0, 36.0, -166.0], [119.0, -91.0, -10.0, 40.0, -6.0, -28.0, -152.0]], [[-143.0, 120.0, -17.0, 127.0, 1.0, 7.0, 39.0], [27.0, 55.0, 120.0, -84.0, 9.0, 146.0, -13.0], [-57.0, 19.0, 10.0, 57.0, 58.0, 77.0, -246.0], [-203.0, -70.0, -31.0, 82.0, 34.0, 25.0, -73.0], [-80.0, -65.0, 183.0, -96.0, 108.0, 169.0, -77.0]]], [[[-127.0, -2.0, 7.0, -27.0, -20.0, -92.0, 137.0], [85.0, 75.0, -26.0, 64.0, 85.0, 9.0, 62.0], [-142.0, -1.0, -2.0, -133.0, -62.0, -4.0, 209.0], [43.0, -7.0, -170.0, -53.0, -29.0, 61.0, -10.0], [156.0, 57.0, -149.0, 175.0, -115.0, 57.0, -51.0]], [[15.0, 125.0, 197.0, -59.0, -9.0, -185.0, 41.0], [-67.0, 14.0, -181.0, 23.0, 44.0, -14.0, -191.0], [73.0, -205.0, -191.0, 106.0, 90.0, -4.0, -69.0], [27.0, -28.0, -6.0, -205.0, 6.0, 57.0, -12.0], [18.0, 218.0, -36.0, -85.0, 61.0, -118.0, 14.0]], [[-215.0, 96.0, -17.0, 9.0, -194.0, -21.0, 40.0], [7.0, -25.0, 67.0, 68.0, 14.0, 55.0, 36.0], [116.0, -163.0, -40.0, 237.0, -36.0, 27.0, 52.0], [65.0, 208.0, -123.0, -14.0, 30.0, 50.0, 5.0], [43.0, -25.0, -68.0, 80.0, 45.0, -25.0, 69.0]]]]]]);
    expect(a.shape).toEqual([2, 1, 2, 3, 5, 7]);
    const b = tensor([[[-63.0, 41.0, 61.0, -56.0, -5.0, -78.0, 74.0, -39.0, -130.0, -50.0, -239.0], [19.0, 12.0, -117.0, 4.0, 14.0, -28.0, 178.0, -50.0, 128.0, -13.0, -331.0], [147.0, -37.0, -9.0, 35.0, -67.0, -49.0, -38.0, 46.0, -11.0, 82.0, 1.0], [2.0, 254.0, 92.0, -191.0, -46.0, 122.0, -52.0, 71.0, -156.0, 44.0, 1.0], [-91.0, -60.0, -137.0, -39.0, -77.0, -105.0, -34.0, -57.0, 159.0, -101.0, 221.0], [99.0, -48.0, -50.0, -4.0, 129.0, -17.0, -49.0, 104.0, -18.0, 149.0, -41.0], [47.0, 162.0, -21.0, -53.0, 12.0, -15.0, -200.0, 15.0, -17.0, -76.0, -117.0]]]);
    expect(b.shape).toEqual([1, 7, 11]);
    const c = matmul(a, b);
    expect(c.shape).toEqual([2, 1, 2, 3, 5, 11]);
    expect(await c.toArrayAsync()).toEqual([[[[[[-3728.0, -14064.0, -1020.0, 15027.0, -30943.0, -7440.0, 35876.0, -21709.0, 17004.0, -15386.0, -10493.0], [-7330.0, -27199.0, -14223.0, 15359.0, -9223.0, -5504.0, 9869.0, -10028.0, 29433.0, -6842.0, 38268.0], [37487.0, -62050.0, -12928.0, 15364.0, 5091.0, -35394.0, -32473.0, 32074.0, -4339.0, 50115.0, 82448.0], [-32349.0, 5993.0, 11844.0, -12960.0, -2526.0, 10531.0, 6793.0, -7465.0, -8180.0, -13432.0, 33677.0], [-8490.0, -3487.0, -15834.0, -2269.0, -8558.0, -15457.0, -4350.0, -9630.0, 17701.0, -16761.0, 6296.0]], [[-11654.0, -81590.0, -7252.0, 49288.0, 20204.0, -27765.0, 69228.0, -20094.0, 18495.0, 7560.0, -35737.0], [26573.0, 3135.0, -2610.0, 9693.0, -8465.0, -604.0, -38473.0, 9366.0, 5311.0, 3470.0, 24705.0], [-7301.0, -16319.0, -8793.0, 2852.0, -7447.0, -4777.0, 32910.0, -8099.0, 14081.0, 2013.0, -2448.0], [-3257.0, 20340.0, -2832.0, -28278.0, -62.0, -3837.0, -7463.0, 9154.0, -13440.0, 5730.0, -2503.0], [35706.0, -50077.0, 5447.0, 36814.0, 16022.0, -15616.0, -8335.0, 16965.0, -9437.0, 35307.0, 9869.0]], [[-30458.0, 28247.0, 16394.0, -28938.0, -2875.0, -160.0, -38228.0, -533.0, -27020.0, -23979.0, 40992.0], [21242.0, -79161.0, -20024.0, 46525.0, 12371.0, -37951.0, 24986.0, -1106.0, 23085.0, 23141.0, -3120.0], [-24533.0, 6389.0, -24722.0, -36975.0, -18941.0, -8859.0, -14969.0, 2632.0, 19856.0, -6674.0, 84302.0], [23965.0, 9959.0, 15463.0, -2250.0, 5595.0, 28268.0, 7732.0, 20885.0, -17658.0, 35958.0, 175.0], [16535.0, -12912.0, -12128.0, 4496.0, 4987.0, -16124.0, 27609.0, 1788.0, 3339.0, 16042.0, -55122.0]]], [[[26654.0, -4943.0, -15346.0, 4791.0, 15419.0, -8437.0, 37740.0, 5874.0, 4777.0, 25335.0, -91442.0], [-2270.0, -53365.0, -33312.0, 14898.0, 7553.0, -12359.0, 53502.0, -2669.0, 41473.0, 23622.0, 13011.0], [-8994.0, 582.0, 24428.0, -9710.0, -4586.0, -885.0, 46858.0, -2968.0, -35609.0, 11529.0, -45847.0], [11649.0, -32892.0, -17043.0, 4533.0, 1151.0, -4948.0, 21570.0, 11243.0, 16916.0, 31357.0, 32148.0], [-22146.0, -13294.0, 10982.0, 2489.0, 24727.0, 29321.0, 47330.0, 1039.0, -3149.0, 18310.0, 1544.0]], [[39888.0, -11502.0, -1576.0, 9014.0, 18974.0, -2566.0, -23924.0, 27572.0, -11586.0, 38432.0, -1876.0], [-26334.0, 27900.0, -10874.0, -16344.0, -19807.0, 5336.0, 34960.0, -25588.0, 21240.0, -32983.0, -40640.0], [11588.0, 15383.0, 8110.0, -11935.0, 20886.0, 22022.0, -1992.0, 20822.0, -17716.0, 28366.0, -8135.0], [50488.0, -52292.0, -22648.0, 40064.0, 14831.0, -14154.0, 25342.0, 14080.0, 24938.0, 45246.0, -32424.0], [-6031.0, -5658.0, 4459.0, 9298.0, 9100.0, 3670.0, 22334.0, -7174.0, -560.0, -2276.0, -31735.0]], [[12295.0, 55201.0, 29469.0, -37752.0, -1564.0, 37444.0, -43588.0, 30909.0, -44426.0, 22585.0, 40321.0], [5154.0, 67807.0, -1005.0, -32809.0, -4502.0, 11563.0, -10035.0, -1102.0, -10488.0, -17007.0, -79525.0], [-11851.0, -3191.0, 24539.0, 7377.0, -21081.0, 3058.0, 17846.0, -13358.0, -16308.0, -12438.0, 5558.0], [15281.0, 103771.0, 34328.0, -77028.0, 3723.0, 54849.0, -34707.0, 44421.0, -68000.0, 36774.0, -7803.0], [49584.0, 5456.0, 21073.0, -387.0, -7616.0, 11151.0, 44497.0, 22391.0, -36216.0, 55627.0, -72243.0]]]]], [[[[[25823.0, 29926.0, 21264.0, -3478.0, 2459.0, 19499.0, -9387.0, 13628.0, -28116.0, 15595.0, -39725.0], [-9679.0, 35558.0, -20599.0, -25185.0, -11758.0, -10435.0, -23042.0, -8757.0, 15747.0, -29733.0, -15463.0], [-13177.0, -36796.0, -35299.0, 25037.0, -4258.0, -10603.0, -13470.0, -15765.0, 61121.0, -23254.0, 70163.0], [5828.0, -18394.0, 9080.0, 22809.0, -3957.0, -2610.0, 28264.0, -9829.0, -1042.0, 622.0, -32025.0], [-14586.0, -21002.0, 26796.0, 9011.0, 2837.0, 6502.0, 36706.0, -3763.0, -25204.0, 10364.0, 453.0]], [[-11466.0, 5685.0, 14735.0, -21566.0, -18208.0, -10995.0, 19103.0, -1165.0, -28506.0, 2741.0, -2934.0], [22996.0, 34278.0, 8930.0, -20044.0, -17603.0, 24557.0, 3276.0, 15306.0, -12571.0, 22039.0, -4171.0], [-26621.0, -14392.0, -4982.0, 4889.0, 14263.0, -25206.0, 62805.0, -26339.0, -1193.0, -18798.0, -106651.0], [1569.0, -94156.0, -8319.0, 67047.0, 26097.0, -20822.0, 50986.0, -13955.0, 28122.0, 14493.0, -7688.0], [-19986.0, -8603.0, 27090.0, -6616.0, -8013.0, 2022.0, 22884.0, -2561.0, -31114.0, 4159.0, 19316.0]], [[11479.0, 34386.0, -12232.0, -18498.0, -1014.0, 23312.0, -3357.0, 9068.0, 13695.0, 7762.0, -10062.0], [29840.0, -33663.0, -21856.0, 18706.0, 14444.0, -23006.0, 6736.0, 10229.0, 14338.0, 25912.0, -27098.0], [-3681.0, -35029.0, -7176.0, 3199.0, -226.0, 6669.0, 39275.0, 6792.0, 12858.0, 30242.0, 45844.0], [3016.0, -2254.0, -745.0, -3216.0, -1929.0, 26417.0, -18349.0, 15380.0, 11176.0, 17965.0, 86768.0], [33798.0, -62281.0, -29383.0, 28154.0, 4206.0, -25677.0, -16005.0, 18237.0, 30482.0, 35752.0, 66670.0]]], [[[8089.0, 15462.0, -5597.0, 6393.0, -7304.0, 7934.0, -30828.0, -2915.0, 16536.0, -16338.0, 14318.0], [-11554.0, 26115.0, -10865.0, -24231.0, -5217.0, -9656.0, 1569.0, -6696.0, 1151.0, -16497.0, -33940.0], [23436.0, -1772.0, -16458.0, 24638.0, 13714.0, -1581.0, -43190.0, 2306.0, 25763.0, -9121.0, -3857.0], [-19730.0, -8301.0, 1229.0, 3154.0, 23497.0, 864.0, 11149.0, -5063.0, -1887.0, -5553.0, -15923.0], [-16587.0, 52945.0, 34264.0, -40188.0, 17547.0, 26758.0, 29569.0, 8355.0, -57089.0, 10925.0, -77910.0]], [[14702.0, -4098.0, -11289.0, 16742.0, -31490.0, -18046.0, 20113.0, -20074.0, 22289.0, -18589.0, -44023.0], [-36441.0, -22950.0, -3297.0, 1543.0, 4114.0, 14992.0, 40606.0, -11609.0, 19400.0, -2676.0, 43866.0], [-48188.0, 18138.0, 29228.0, -31676.0, -3588.0, 13990.0, -18406.0, -438.0, -34610.0, -16425.0, 78450.0], [1008.0, -56117.0, -17303.0, 37495.0, 16052.0, -27457.0, 7305.0, -9078.0, 25084.0, -1699.0, 2997.0], [-19029.0, -12632.0, -34655.0, 12190.0, -10467.0, -20723.0, 46832.0, -34832.0, 50805.0, -35233.0, -59900.0]], [[30343.0, 14380.0, 3422.0, 15640.0, 15853.0, 36140.0, 981.0, 12916.0, 7873.0, 21929.0, -27092.0], [14932.0, 17132.0, 3581.0, -13809.0, -1553.0, 2222.0, -20385.0, 14349.0, -14831.0, 12506.0, 3364.0], [-7418.0, 73766.0, 50801.0, -55275.0, -4205.0, 28931.0, -41733.0, 24253.0, -79570.0, 7174.0, 11279.0], [-15797.0, 2766.0, -27267.0, -6074.0, 15672.0, -10650.0, 42766.0, -16022.0, 25496.0, -12616.0, -80525.0], [-16347.0, 33977.0, 7156.0, -25480.0, -5551.0, 5103.0, -16949.0, -2005.0, -14090.0, -17395.0, 907.0]]]]]]);
});
test("matmul (2, 1, 2, 3, 5, 7) x (2, 7, 11)", async () => {
    const a = ones([2, 1, 2, 3, 5, 7]);
    const b = ones([2, 7, 11]);
    expect(() => matmul(a, b)).toThrow('The size of tensor a (3) must match the size of tensor b (2) at non-singleton dimension 3');
});
