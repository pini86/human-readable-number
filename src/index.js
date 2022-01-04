module.exports = function toReadable (number) {
    
    /*А вдруг 0? */
    if ( number === 0 ) {
        return 'zero';
    }

    /* Массив названий единиц, десятков, сотен, тысяч и т.д */
    
    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const others = ['', 'thousand', 'million', 'billion', 'trillion'];
        
    const string = String ( number );
    let start = string.length;;
    let end;
    let part;
    let parts = [];
    let ints;
    let word;
    let words = [];
        
    /* Разделяем исходное число на фрагменты по 3 цифры с конца */
    
    while ( start > 0 ) {
        end = start;
        parts.push ( string.slice ( ( start = Math.max ( 0 , start - 3 ) ) , end ) );
    }
         
    
    for ( let a = 0; a < parts.length; a++ ) {
        part = parseInt ( parts [ a ] );
        if ( part ) {

            ints = parts [ a ].split ( '' ).reverse ().map ( parseFloat );  /* Разделяем фрагмент на массив отдельных целых чисел */

            if ( ints [ 1 ] === 1 ) {                                
                ints [ 0 ] += 10;
            }

        /* добавляем слово разряда если не равно 0 и элемент массива существует */

            if ( ( word = others [ a ] ) ) {
                words.push ( word );
            }

        /* Добавляем названия единиц если элемент массива существует */

            if ( ( word = ones [ ints [ 0 ] ] ) ) {
                words.push ( word );
            }

        /* Добавляем названия десятков если элемент массива существует */

            if ((word = tens [ ints [ 1 ] ] ) ) {
                words.push ( word );
            }
        
        /* Добавляем названия сотен если элемент массива существует */

            if ( ( word = ones [ ints [ 2 ] ] ) ) {
                words.push ( word + ' hundred' );
            }
        }
    }

    /*Возвращаем в обратном порядке и разделяем пробелами*/

    return words.reverse ().join ( ' ' );
 }
