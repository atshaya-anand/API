<!-- Date Difference -->
<?php
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $start_date = $_GET['s_date'];
    $end_date = $_GET['e_date'];
    $start_date = date_create($start_date);
    $end_date = date_create($end_date);
    $diff= date_diff($end_date, $start_date);
    $diff = $diff->format('%y years %m months %d days %h hours %i seconds');
    $result_json = array('difference' => $diff);

    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');
    if (empty($start_date) || empty($end_date)) {
        echo "Dates are incorrect syntax";
    } else {
        echo json_encode($result_json);
    }
}
?>

<!-- SET Union -->
<?php
   function unionFunc($array1, $array2) {
       $result = array_merge($array1, $array2);
       return $result;
   }
?>

<!-- SET Intersection -->
<?php
   function intersectionFunc($array1, $array2) {
       $result = array_intersect($array1, $array2);
       return $result;
   }
?>

<!-- SET Difference -->
<?php
   function diffFunc($array1, $array2) {
       $result = array_diff($array1, $array2);
       return $result;
   }
?>

<!-- MATRIX - Transpose -->
<?php
  function transpose($str) {
     $array = explode('|', $str);
     $final_array = array();
     foreach($array as $val)
     {
        array_push($final_array, explode(',', $val));
     }
     $newFoo = [];
     foreach($final_array as $a => $k){
        foreach($k as $i => $j){
           $newFoo[$i][]= $j;
        }
     }
     $tmpArr = array();
     foreach ($newFoo as $sub) {
     $tmpArr[] = implode(',', $sub);
     }
     $result = implode('|', $tmpArr);
     return ($result);
  }
?>

<!-- MATRIX - Lower Diagonal -->
<?php
   function lowerDiagonal($str) {
       $array = explode('|', $str);
       $final_array = array();
       foreach($array as $val)
       {
           array_push($final_array, explode(',', $val));
       }
       $i; $j;
       $row = count($final_array);
       $col = count($final_array[0]);
       $newArr = array();
       for ($i = 0; $i < $row; $i++)
       {
           $temp_array = array();
           for ($j = 0; $j < $col; $j++)
           {
               if ($i < $j)
               {
                   array_push($temp_array, 0);
               }
               else{
                   array_push($temp_array, $final_array[$i][$j]);
               }
           }
           array_push($newArr, $temp_array);
       }
       $tmpArr = array();
       foreach ($newArr as $sub) {
           $tmpArr[] = implode(',', $sub);
       }
       $result = implode('|', $tmpArr);
       return ($result);
   }
?>

<!-- MATRIX - Upper Diagonal
<?php
   function upperDiagonal($str) {
       $array = explode('|', $str);
       $final_array = array();
       foreach($array as $val)
       {
           array_push($final_array, explode(',', $val));
       }
       $i; $j;
       $row = count($final_array);
       $col = count($final_array[0]);
       $newArr = array();
       for ($i = 0; $i < $row; $i++)
       {
           $temp_array = array();
           for ($j = 0; $j < $col; $j++)
           {
               if ($i > $j)
               {
                   array_push($temp_array, 0);
               }
               else{
                   array_push($temp_array, $final_array[$i][$j]);
               }
           }
           array_push($newArr, $temp_array);
       }
       $tmpArr = array();
       foreach ($newArr as $sub) {
           $tmpArr[] = implode(',', $sub);
       }
       $result = implode('|', $tmpArr);
       return ($result);
   }
?>

// Figure to Word
<?php
   if ($_SERVER["REQUEST_METHOD"] == "POST") {
       $number =  $_POST['currency'];
       $no = floor($number);
       $point = round($number - $no, 2) * 100;
       $hundred = null;
       $digits_1 = strlen($no);
       $i = 0;
       $str = array();
       $words = array('0' => '', '1' => 'one', '2' => 'two',
       '3' => 'three', '4' => 'four', '5' => 'five', '6' => 'six',
       '7' => 'seven', '8' => 'eight', '9' => 'nine',
       '10' => 'ten', '11' => 'eleven', '12' => 'twelve',
       '13' => 'thirteen', '14' => 'fourteen',
       '15' => 'fifteen', '16' => 'sixteen', '17' => 'seventeen',
       '18' => 'eighteen', '19' =>'nineteen', '20' => 'twenty',
       '30' => 'thirty', '40' => 'forty', '50' => 'fifty',
       '60' => 'sixty', '70' => 'seventy',
       '80' => 'eighty', '90' => 'ninety');
       $digits = array('', 'hundred', 'thousand', 'lakh', 'crore');
       while ($i < $digits_1) {
           $divider = ($i == 2) ? 10 : 100;
           $number = floor($no % $divider);
           $no = floor($no / $divider);
           $i += ($divider == 10) ? 1 : 2;
           if ($number) {
           $plural = (($counter = count($str)) && $number > 9) ? 's' : null;
           $hundred = ($counter == 1 && $str[0]) ? ' and ' : null;
           $str [] = ($number < 21) ? $words[$number] .
               " " . $digits[$counter] . $plural . " " . $hundred
               :
               $words[floor($number / 10) * 10]
               . " " . $words[$number % 10] . " "
               . $digits[$counter] . $plural . " " . $hundred;
           } else $str[] = null;
       }
       $str = array_reverse($str);
       $result = implode('', $str);
       $points = ($point) ?
       "." . $words[$point / 10] . " " .
               $words[$point = $point % 10] : '';
       $result_json = array('currency' => $result . "rupees " . $points . " paise");
       header('Cache-Control: no-cache, must-revalidate');
       header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
       header('Content-type: application/json');
       echo json_encode($result_json);
   }
?>

// MD5 Checksum
<?php
   if ($_SERVER["REQUEST_METHOD"] == "POST") {
       $string = $_POST['string'];
       echo md5($string);
   }
?>

// Bar Code
<?php
    require '../vendor/autoload.php';
    function qrcode_generator($data)
    {
        $return_response = array();
        $barcode = new \Com\Tecnick\Barcode\Barcode();
        // creating folder to save images
        $targetPath = "images/";
        //if the target path does not exist create one
        if (! is_dir($targetPath)) {
            mkdir($targetPath, 0777, true);
        }
        // instantiating barcode class
        $barcode = new \Com\Tecnick\Barcode\Barcode();
        // creating barcode for the given data
        $bobj = $barcode->getBarcodeObj('QRCODE,H', $data, 150, 150, 'black', array(0, 0, 0, 0))->setBackgroundColor('#ffffff');
        $imageData = $bobj->getPngData();
        $timestamp = time();
        $files2 = glob( $targetPath ."*" ); 
        if( $files2 ) 
        { 
            $filecount = count($files2); 
        } 
        // saving the png data
        file_put_contents($targetPath . (string)$filecount . '.png', $imageData);
        $return_response['filename'] = (string)$filecount.'.png';
        $return_response['filepath'] = $targetPath;
        return $return_response;
}
?>

// OTP - Numeric
<?php
   if ($_SERVER["REQUEST_METHOD"] == "POST") {
       $n = $_POST['n'];
       $generator = "1357902468";
       $result = "";
       for ($i = 1; $i <= $n; $i++) {
           $result .= substr($generator, (rand()%(strlen($generator))), 1);
       }
       $result_json = array('otp' => $result);
       header('Cache-Control: no-cache, must-revalidate');
       header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
       header('Content-type: application/json');
       if (empty($n)) {
           echo "Incorrect number";
       } else {
           echo json_encode($result_json);
       }
   }
?>

// ALPHANUMERIC
<?php
   if ($_SERVER["REQUEST_METHOD"] == "POST") {
       $n = $_POST['n'];
       $generator = "1357902468abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
       $result = "";
       for ($i = 1; $i <= $n; $i++) {
           $result .= substr($generator, (rand()%(strlen($generator))), 1);
       }
       $result_json = array('otp' => $result);
       header('Cache-Control: no-cache, must-revalidate');
       header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
       header('Content-type: application/json');
       if (empty($n)) {
           echo "Incorrect number";
       } else {
           echo json_encode($result_json);
       }
   }
?>

// ALPHABET
<?php
   if ($_SERVER["REQUEST_METHOD"] == "POST") {
       $n = $_POST['n'];
       $generator = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
       $result = "";
       for ($i = 1; $i <= $n; $i++) {
           $result .= substr($generator, (rand()%(strlen($generator))), 1);
       }
       $result_json = array('otp' => $result);
       header('Cache-Control: no-cache, must-revalidate');
       header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
       header('Content-type: application/json');
       if (empty($n)) {
           echo "Incorrect number";
       } else {
           echo json_encode($result_json);
       }
   }
?>

<?php
    // required headers
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Allow-Credentials: true");
    header('Content-Type: application/json');
    include "phpqrcode/qrlib.php";
    $str=isset($_GET['string']) ? $_GET['string'] : die();
    $res=array();
    $res_str="";
    $n=rand(1,100);
    $s="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRST";
    for($i=0;$i<5;$i++)
    {
        $ind=rand(1,strlen($s)-1);
        $res_str.=$s[$ind];
    }
    $res_str.='_'.(string)$n;
    $res_str.='_QR.png';
    QRcode::png($str, $res_str, "L", 4, 4);
    echo json_encode($res_str);
?>

// CAPTCHA
<?php
	session_start();
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$data = $_POST['data'];
		$captcha = $data;
		$_SESSION["captcha"] = $captcha;
		$im = imagecreatetruecolor(50, 24);
		$bg = imagecolorallocate($im, 22, 86, 165);
		$fg = imagecolorallocate($im, 255, 255, 255);
		imagefill($im, 0, 0, $bg);
		imagestring($im, rand(1, 7), rand(1, 7), rand(1, 7), $captcha, $fg);
		header("Cache-Control: no-store, no-cache, must-revalidate"); 
		define('BASE_DIR', dirname(__FILE__).'/images/');
		$file = BASE_DIR . 'images' . '.png';
		imagepng($im,$file);
		imagedestroy($im);
		echo "Captcha saved";
	}
?>

// Electric Calculator
<?php 
    function electical_calc(){
    $find=$_POST['find'];
    $power=$_POST['power'];
    $current=$_POST['current'];
    $voltage=$_POST['voltage'];
    $resistance=$_POST['resistance'];
    $time=$_POST['time'];
    $Ah=$_POST['Ah'];
    $Wh=$_POST['Wh'];
    if ($find=== "amps") {
    $result = ($power /$voltage);
    echo $result;
    } 
    else if ($find === "kiloWatt"||$find=== "kVA") {
    $result = (($current * $voltage) / 1000);
    echo $result;
    } 
    else if ($find === "Watt"||$find === "VA") {
    $result=($current * $voltage) ;
    echo $result;
    } 
    else if ($find=== "volts") {
    $result=$current * $resistance;
    $result1=$power /$current;
    echo $result;
    echo $result1;
    } 
    else if ($find=== "joules") {
    $result=($power * $time);
    echo $result;
    } 
    else if ($find === "mAh") {
    $result=($Wh * 1000) / $voltage ;
    echo $result;
    } 
    else if ($find === "Wh") {
    $result=(($Ah * $voltage));
    echo $result;
    } 
    }
?> 

TRIGONOMETRIC FUNCS - MATH LOG 3
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Content-type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  
    $param_degree = $_POST['degree'];
    $param_radian = $_POST['radian'];
    $res=array();
    $param=array();
    if(strlen($param_degree)>0){
        array_push($param, $param_degree);
        array_push($param, "-");
        $res= GenerateList(radian((float)$param_degree)); 
    }else{
        array_push($param, "-");
        array_push($param, $param_radian);
        $res= GenerateList(((float)$param_radian)); 
    }
   
   
    $Obj = new \stdClass();
    $Obj->title = "trignomentry";
    $Obj->language = "PHP";
    $Obj->result = $res;
    $Obj->params = $param;
    $Obj->question = "trignomentry";
    $Obj->status = 200;
     $output = new \stdClass();
    $output->data=(object)$Obj;
    $output->status=200;
    $JSON = json_encode($output);
    echo $JSON;
}

function GenerateList($rad){
    $res= array();
    array_push($res, sin($rad));
    array_push($res, cos($rad));
    array_push($res, tan($rad));
    array_push($res, asin($rad));
    array_push($res, acos($rad));
    array_push($res, atan($rad)); 
    return $res;
}
function radian($degree){
    return $degree*(pi()/180);
}

?>

LOG 1 CALC - LOG/LN/ANTILOG
<?php
    // required headers
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Allow-Credentials: true");
    header('Content-Type: application/json');
    function myLog($n,$b)
    {
        $r=ln($n)/ln($b);
        return $r;
    }
    function ln($x)
    {
        $n=100000.0;
        $p=pow($x,(1/$n));
        return $n*($p-1);
    }
    function antilog($n,$b)
    {
        return pow($b,$n);
    }
    $number=isset($_GET['number']) ? $_GET['number'] : die();
    $op=isset($_GET['operation']) ? $_GET['operation'] : die();
    $number=floatval($number);
    $base;
    $r=0.0;
    if($op=="log")
    {
        $base=isset($_GET['base']) ? $_GET['base'] : die();
        $base=floatval($base);
        $r=myLog($number,$base);
        $r=round($r,3);
    }
    else if($op=="antilog")
    {
        $base=isset($_GET['base']) ? $_GET['base'] : die();
        $base=floatval($base);
        $r=antilog($number,$base);
        $r=round($r,4);
    }
    else
    {
        $r=ln($number);
        $r=round($r,4);
    }
    $res=(object)[ "result" => $r];
    echo json_encode($res);
?>


LOG 2 CALC - GCD/LCM , ROOT
<?php
function getGcd($n1,$n2)
	{
		if ($n1>$n2)
		{	$num=$n1;
			$den=$n2;
		}
		else
		{
			$num=$n2;
			$den=$n1;
		}
		$r=$num%$den;
		while($r!=0)
		{
			$num=$den;
			$den=$r;
			$r=$num%$den;
		}
		$gcd=$den;
		
		return $gcd;
	}

function diffCube($n,$mid)
    {
		$mid3=$mid*$mid*$mid;
		if ($n>$mid3)
			return $n-$mid3;
		return $mid3-$n; 
	}
function binarySearchCube($start,$end,$e,$num)
	{
		while(1)
		{	
		$mid=($start+$end)/2;
		$error=diffCube($num,$mid);
		if ($error<=$e)
			return $mid;
		if (($mid*$mid*$mid)>$num)
			$end=$mid;
		else
			$start=$mid;
		}
	}

$data=isset($_GET['data']) ? $_GET['data'] : die();
$operation=isset($_GET['operation']) ? $_GET['operation'] : die();
$numbers=explode(",",$data);
$numbers = array_map(function($value) {
    return floatval($value);
}, $numbers);
//echo $data,$operation;
$r=0;

if ($operation=="gcd" || $operation=="lcm")
	{
		if(sizeof($numbers)==1)
			$r=$numbers[0];
		else
		{
			$gcd=getGcd($numbers[0],$numbers[1]);
			$lcm=$numbers[0]*$numbers[1]/$gcd;

			if(sizeof($numbers)>2)
			{	
				for($i=0;$i<sizeof($numbers);$i++)
					{
						$gcd=getGcd($gcd,$numbers[$i]);
						$lcm=($numbers[$i]*$lcm)/floatval(getGcd($numbers[$i],$lcm));
					}
			}
			if($operation=="gcd")
				$r=$gcd;
			else
				$r=$lcm;
		}
	}
else if ($operation=="sqrt")
	{
		$num=floatval($numbers[0]);
		if($num==0)
			$r=0;
		else
		{
			$g=$num/2.0;
			$g2=$g+1;
			while($g!=$g2)
			{
				$n=$num/$g;
				$g2=$g;
				$g=($g+$n)/2;

			}
			//r=g.toPrecision(6)
			$r=$g;
			$r=round($g,6); 
		}
		
	}
else if($operation=="cbrt")
	{
		$num=floatval($numbers[0]);
		$start=0;
		$end=$num;
		$e=0.0000001;
		$r=binarySearchCube($start,$end,$e,$num);
		//r=r.toPrecision(5)
		$r=round($r,6);

	}
else if ($operation=="nrt")
	{
		$a=$numbers[0];
		$n=$numbers[1];
		$x_pre=rand()%10;
		$e=0.001;
		$maxX=PHP_INT_MAX;
		$x_cur;
		while($maxX>$e)
		{
			$x_cur=((int)($n-1.0)*$x_pre+$a/(int)pow($x_pre,$n-1))/$n;
			$maxX=abs($x_cur-$x_pre);
			$x_pre=$x_cur;
			//r=r.toPrecision(5)
		}
		$r=$x_cur;
		$r=floor($x_cur);

	}

$res=(object)[ "result" => $r];

echo json_encode($res);
?>

// STATISTICAL CALCULATOR 
<?php 
    function statcal(){
    $data=$_POST['data']; 
    $type=$_POST['type'];
    $result=0;
    //echo $type;
    if ($type==1){
        $result=getStandardDeviation($data);
    }
    else if ($type==2){
        $result=getVariance($data);
    }
    else{  
        $result=getLinearRegressionEqu($data[0],$data[1]);
    }
    echo $result;
    }

    function getStandardDeviation($data){
        $standardDeviation=sqrt(getVariance($data));
        return $standardDeviation;
    }

    function getVariance($data){
        $sum=0;
        $count=0;
        $mean=0;
        $variance=0;
        foreach($data as $value){
            $sum=$sum+$value;
            $count=$count+1;
        }
        $mean=$sum/$count;
        foreach ($data as $value){
            $variance=$variance+(($value-$mean)*($value-$mean));
        }
        $variance=$variance/$count;
        return $variance;
    }

    function  getLinearRegressionEqu($X,$Y){
        $sumOfX=0;
        $sumOfY=0;
        $sumOfX2=0;
        $sumOfXY=0;
        $ctr=0;
        for($i=0;$i<count($X);$i++){
            $sumOfX=$sumOfX+$X[$i];
            $sumOfY=$sumOfY+$Y[$i];
            $sumOfXY=$sumOfXY+($X[$i]*$Y[$i]);
            $sumOfX2=$sumOfX2+($X[$i]*$X[$i]);
            $ctr=$ctr+1;
        }
        $b=($sumOfXY-(($sumOfX*$sumOfY)/$ctr))/($sumOfX2-(($sumOfX*$sumOfX)/$ctr));
        $a=($sumOfY-($b*$sumOfX))/$ctr;
        $a=round($a,2);
        $b=round($b,2);
        return "Y=".$b."X+".$a;
        }
?> 
