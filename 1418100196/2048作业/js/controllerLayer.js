/**
 * ��ʼ��ť�󶨵Ŀ�ʼ��Ϸ����
 * @param  {[type]} cxt [����]
 * @return {[type]}     []
 */
function startGame(cxt){
    //��ʼ����Ϸ����
    init(cxt)
    //��ʼ������
    score = 0
    //ˢ�·���
    updateScore(score)
    //�½�������ʼ����
    newBox(cxt)
    newBox(cxt)

}
function fillBox(cxt,i,j){
    var x = (i + 1) * margin + margin_left + i * box_width
    var y = (j + 1) * margin + margin_top + j * box_width
    cxt.beginPath()
    cxt.fillStyle = "white"
    cxt.fillRect(x , y, box_width, box_width)
    cxt.fill()
}

/**
 * �½�һ��2��4�ķ���
 * @param  {[type]} cxt []
 * @return {[bool]}     [û�пո�ʱ����false�����򷵻�true]
 */

function newBox(cxt) {
    //���û�пո�ֱ�ӷ���false,���޷������·���
    if (noSpace()) {
        return false
    }
    //�������һ��λ��(x:0-3,y:0-3)
    var randx = parseInt(Math.floor(Math.random() * 4))
    var randy = parseInt(Math.floor(Math.random() * 4))

//Ѱ�ҿհ����λ�õ��Ż��㷨
// ���Ѱ��50��
// ���50�ζ�û���ҵ��Ļ��Ͳ��ñ���Ѱ��
// �ڱ���Ѱ�ҵ��ĵ�һ����λ�½�����
    var times = 0;
    while (times < 50) {
        if (nums[randx][randy] == 0){
            break
    }
    randx = parseInt(Math.floor(Math.random() * 4))
    randy = parseInt(Math.floor(Math.random() * 4))
    times++
}
  if(times == 50){
      for(var i = 0; i < 4; i++){
          for (var j = 0; j < 4; j++){
              if(nums[i][j]==0){
                  randx = i
                  randy = j
              }
          }
      }
  }



//�������ֵ���2��4
var randNumber = Math.random() < 0.5 ? 2:4;

//randx,randyλ�õķ����ϸղŵ������ʼֵ
nums[randx][randy] = randNumber;

//���Ʒ���
drawBox(cxt, randx, randy, randNumber);
    fillBox(cxt,randx,randy)
    return true
}



/**
 * ���������������ں���
 * @return {[type]} []
 */
function moveKeyDown(){
    event.preventDefault()
    switch(event.keyCode){
        //37�Ƿ����
        case 37 ://left
            if(moveLeft()){  //Ϊ�ջ������
                //�����������ƶ�������Դ����·���
                newBox(context)
                //֮���ж���Ϸ�Ƿ����
                isGameOver()
            }
            break
        // 38ʱ�����ϼ�
        case 38 ://up
            if(moveUp()){
                //�����������ƶ�������Դ����·���
                newBox(context)
                // ֮���ж���Ϸ�Ƿ����
                isGameOver()
            }
            break
        // 39�Ƿ����Ҽ�
        case 39: //right
            if (moveRight()) {
                // �����������ƶ����򴴽��·���
                newBox(context)
                // ֮���ж���Ϸ�Ƿ����
                isGameOver()
            }
            break
        // 40�Ƿ����¼�
        case 40: //down
            if (moveDown()) {
                // �����������ƶ����򴴽��·���
                newBox(context)
                // ֮���ж���Ϸ�Ƿ����
                isGameOver()
            }
            break
        default:
            break
    }
}

//��������ʼ�������¼�������¼���������ʼ���꣨startX,startY)
document.addEventListener('touchstart', function(event) {
    startX = event.touches[0].pageX
    startY = event.touches[0].pageY
})
//�����������������¼�������¼���������ֹ���꣨endX�� endY��
document.addEventListener('touchend',function(event){
    endX = event.changedTouches[0].pageX
    endY = event.changedTouches[0].pageY

    //������ʼ�������ֹ����Ĳ�ֵ���ƶ��ľ��룩
    var daltaX = endX - startX
    var daltaY = endY - endY

    //����ƶ��ľ����С����ֱ����ֹ�����������з����ƶ�
    //��Ϊ����ֻ����Ҳ�С�Ĵ�������Ļ����
    if (Math.abs(daltaX) < 0.3 * documentWidth && Math.abs(daltaY) < 0.3 * documentWidth)
        return

    //����ƶ���ˮƽ������������ֱ�������
    //��Ϊˮƽ�ƶ�
    if (Math.abs(daltaX) >= Math.abs(daltaY)) {
        //ˮƽ��ֵ��ֵΪ��ֵ������������ƶ�
        if (daltaX < 0) {
            if (moveLeft()) {  //Ϊ�ջ������
                newBox(context)
                isGameOver()
            }

            //ˮƽ��ֵ��ֵΪ��ֵ����������һ���
        } else {
            if (moveRigth()) {
                newBox(context)
                isGameOver()
            }
        }
        //����ƶ���ˮƽ�������С����ֱ�������
        //��Ϊ��ֱ����
      }else {
            //��ֱ��ֵ��ֵΪ��ֵ����������ϻ���
            if (daltaY < 0) {
                if (moveUp()) {
                    newBox(context)
                    isGameOver()
                }
                //��ֱ��ֵ��ֵΪ��ֵ����������»���
            } else {
                if (moveDown()) {
                    newBox(context)
                    isGameOver()
                }
            }
        }
    })

/**
 * �����ƶ�
 * * @return {[bool]} [���������ƶ��ͷ���true�����򷵻�false]
 */
function moveLeft(){
    //�����ж��ܲ��������ƶ�
    //������ܾͷ���false
    if(!canMoveLeft()){
        return false
    }
    //����ֱ����ڶ��п�ʼ�����������λ��
    //��Ϊ��ߵ�һ�п϶�û�������ƶ�
    for(var j = 0; j < 4; j++){
        for(var i = 1;i < 4; i++){
            //�����λ�ò��ǿյ�
            if(nums[i][j]!=0){
                //�ٴα������λ����ߵ�����λ��
                for(var k = 0;k < i; k++){
                    //�������ߵĸ�����0����ֱ���ƶ����Ǹ���0��λ��
                    //�Լ�ԭ����λ���ٱ��0
                    if(nums[k][j] == 0){
                        nums[k][j] = nums[i][j]
                        nums[i][j]=0
                    }
                    //�������ߵĸ��Ӻ��Լ�һ��
                    //���������������м䣨ͬһ�У�û����������
                    //�ͺϲ���������������ߵ�λ�ã�ԭ����λ�ñ��0
                    //���ҼǷ֣���ֵ����ԭ����ֵ��2������ˢ�·���
                    else if (nums[k][j] == nums[i][j] && noBlockHorizontal(j, k, i, nums)){
                        nums[k][j] += nums[k][j]
                        nums[i][j] = 0
                        score = score + nums[k][j]
                        updateScore(score)

                    }
                }
            }
        }
    }
    //����UI
    updateBoardView(context)
    return true
}

/**
 * �ж��ܷ������ƶ�
 * * @return {[bool]} [���������ƶ��ͷ���true�����򷵻�false]
 */
function canMoveLeft(){
    //����ֱ����ڶ��п�ʼ�����������λ��
    //��Ϊ��ߵ�һ�п϶�û�������ƶ�
    for(var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++){
        if(nums[i][j] !=0){
            //����������ߵĸ����ǲ���0
            //�����ǲ��Ǻ���һ������ֵ
            //����������һ���Ϳ����ƶ�
            if(nums[i - 1][j] == 0 || nums[i - 1][j] == nums[i][j]){
                return true
            }
        }
    }
}
     return false
}

/**
 * �����ƶ�
 * @return {[bool]} [���������ƶ��ͷ���true�����򷵻�false]
 */
function moveUp() {
    if (!canMoveup()) {
        return false
    }
    for (var i = 0; i < 4; i++)
        for (var j = 1; j < 4; j++) {
            if (nums[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (nums[i][k] == 0) {
                        nums[i][k] =nums[i][j]
                        nums[i][j] = 0

                    } else if (nums[i][k] == nums[i][j] && noBlockVertical(i, k, j, nums)) {
                        nums[i][k] += nums[i][j]
                        nums[i][j] = 0
                        score += nums[i][k]
                        updateScore(score)

                    }
                }
            }
        }
    updateBoardView(context);
    return true;
}
/**
 * �ж��ܷ������ƶ�
 * @return {[bool]} [���������ƶ��ͷ���true�����򷵻�false]
 */
function canMoveup(){
    for(var i = 0; i < 4; i++){
        for(var j = 1; j < 4; j++){
            if(nums[i][j] != 0){
                if(nums[i][j - 1] == 0 || nums[i][j - 1] == nums[i][j]){
                    return true
                }
            }
        }
    }
    return false
}
/**
 * �����ƶ�
 * @return {[bool]} [���������ƶ��ͷ���true�����򷵻�false]
 */
function moveRight(){
    if(!canMoveRight()){
        return false
    }

    for(var j = 0; j < 4; j++)
        for(var i = 2; i >= 0; i--){
            if(nums[i][j] != 0){
                for(var k = 3; k > i; k--){
                    if(nums[k][j] == 0 && noBlockHorizontal(j,i,k,nums)) {
                        nums[k][j] = nums[i][j]
                        nums[i][j] = 0
                    } else if(nums[k][j] == nums[i][j] && noBlockHorizontal(j, i, k, nums)){
                        nums[k][j] += nums[i][j]
                        nums[i][j] = 0
                        score += nums[k][j]
                        updateScore(score)
                    }
                }
            }
        }
        updateBoardView(context)
        return true
    }

/**
 * �ж��ܷ������ƶ�
 * @return {[bool]} [���������ƶ��ͷ���true�����򷵻�false]
 */
function canMoveRight(){
    for (var j = 0;j < 4; j++){
        // ע�⣬���ﲻ��д��for(var i = 0; i <= 3; i++)
        for(var i = 2; i >=0; i--){
            if(nums[i][j] != 0){
                if (nums[i + 1][j] == 0 || nums[i + 1][j] == nums[i][j]){
                    return true
                }
            }
        }
    }
    return false
}

/**
 * �����ƶ�
 * @return {[bool]} [���������ƶ��ͷ���true�����򷵻�false]
 */
function moveDown(){
    if(!canMoveDown()){
        return false
    }
    for(var i = 0; i < 4; i++)
     for(var j = 2; j >= 0; j--){
         if(nums[i][j] != 0){
             for(var k = 3; k > j; k--){
                 if(nums[i][k] == 0 && noBlockVertical(i, j, k, nums)) {
                     nums[i][k] = nums[i][j]
                     nums[i][j] = 0
                 } else if(nums[i][k] == nums[i][j] && noBlockVertical(i, j, k, nums)){
                     nums[i][k] += nums[i][j]
                     nums[i][j] = 0
                     score += nums[i][k]
                     updateScore(score)
                 }
             }
         }
     }
    updateBoardView(context)
    return true
}

/**
 * �ж��ܷ������ƶ�
 * @return {[bool]} [���������ƶ��ͷ���true�����򷵻�false]
 */
function canMoveDown(){
    for(var i = 0; i < 4; i++){
        for(var j = 2; j >=0; j--){
            if(nums[i][j] != 0){
                if(nums[i][j + 1] == 0 || nums[i][j + 1] == nums[i][j]){
                    return true
                }
            }
        }
    }
    return false
}

/**
 * �ж�ͬһ��ĳ���������м���û����������
 * @param  {[int]} col  [����1�����2��ͬ����]
 * @param  {[int]} row1 [����1����]
 * @param  {[int]} row2 [����2����]
 * @param  {[int[][]]} nums [�������飨���и��ӣ�]
 * @return {[bool]}      [�пո�ͷ���true�����򷵻�false]
 */

function noBlockVertical(col, row1, row2, nums){
    for(var i = row1 + 1; i < row2; i++){
        if(nums[col][i] != 0){
            return false
        }
    }
    return true
}

/**
 * �ж�ͬһ��ĳ���������м���û����������
 * @param  {[int]} row  [����1�����2��ͬ����]
 * @param  {[int]} col1 [����1����]
 * @param  {[int]} col2 [����2����]
 * @param  {[int[][]]} nums [�������飨���и��ӣ�]
 * @return {[bool]}      [�пո�ͷ���true�����򷵻�false]
 */
function noBlockHorizontal(row, col1, col2, nums){
     for(var i =col1 + 1; i < col2; i++){
         if(nums[i][row] != 0){
             return false
         }
     }
    return true
}

/**
 * ��HTMLҳ���и��·���score
 * @param  {[type]} score [���µķ���]
 * @return {[type]}       []
 */
function updateScore(score){
    document.getElementById('score').innerText = score
}

/**
 * �ж���û�пյĸ���
 * @return {[bool]} [�пյĸ��Ӿͷ���false�����򷵻�true]
 */
function noSpace(){
    for(var i = 0; i < 4; i++)
    for (var j = 0; j < 4; j++)
        if(nums[i][j] == 0)
            return false;

        return true;
    }


/**
 * �ж��ܷ�����ƶ�
 * @return {[bool]} [���Լ����ƶ�����true�����򷵻�false]
 */
function noMove(){
    if(canMoveLeft() || canMoveRight() || canMoveUp() || canMoveDown())
    return false;
    return true;
}

/**
 * �ж���Ϸ�����������Ǽ�û�пյĸ��ӣ�Ҳû���ƶ�
 * @return {bool} [��Ϸ��������true�����򷵻�false]
 */
function isGameOver(){
    if(noMove() && noSpace() ){
        alert("GameOver.score:" + score);
        return true
    }
    return false
}