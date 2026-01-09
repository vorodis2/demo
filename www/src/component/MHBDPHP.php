<?php

    $tip = $_REQUEST['tip']; 



    if($tip == "saveFile") {
        $dest = $_REQUEST['dest'];
        $res = move_uploaded_file($_FILES['file']['tmp_name'], $dest);
        if($res) {
            echo $res;//"ok";
        }
        return;
    }

    if($tip == "saveJSON") {//Сохронения конфигурации проекта       
        $mytext = stripslashes($_REQUEST['text']);  
        $fp2 = fopen ($_REQUEST['link'], "w");  
        fwrite($fp2,$mytext);  
        fclose($fp2);       
        echo "okSave";
        return;
    }

    if($tip == "saveFile1251") {//Сохронения конфигурации проекта       
        /*$mytext = stripslashes($_REQUEST['text']);    
        $fp2 = fopen ($_REQUEST['link'], "w");  
        fwrite($fp2,$mytext);  
        fclose($fp2);*/ 
        $mytext = stripslashes($_REQUEST['text']);
        $fp2 = fopen ($_REQUEST['link'], "w");  
        fwrite($fp2, iconv('UTF-8', 'Windows-1251', $mytext));  
        fclose($fp2);
        echo "saveFile1251!!!!!!!!!!";
        return;
    }


    if($tip == "mkdir") {//Создание нового проекта  
        $dir = $_REQUEST['dir'];        
        $rezult = mkdir($dir);
        if($rezult==true){
            echo "mkdir== yes"; 
        }else{
            echo "mkdir== not ".$dir;   
        }
        
        return;
    }
    
    if($tip == "unlink") {//удоление
        $dir = $_REQUEST['dir'];        
        unlink($dir);
        echo "ok_unlink";   
        return;
    }

    if($tip == "getTimeFile") {//удоление
        
        
        $unix_time = filemtime($_REQUEST['dir']);

        echo date('d.m.Y H:i:s', $unix_time); // вывод даты в формате ДД.ММ.ГГГГ
     
        return;
    }


    if($tip == "isDir") {//Создание нового проекта  
        $dir = $_REQUEST['dir'];
        $rezult="notDir";
        if (file_exists($dir)==true){
            $rezult="yesDir";
        }       
        echo $rezult;   
        return;
    }


    // функция копирования файлов (включая вложеные) из папки $source в $res 
    function copy_files($source, $res){ 
        $hendle = opendir($source); // открываем директорию 
        while ($file = readdir($hendle)) { 
            if (($file!=".")&&($file!="..")) { 
                if (is_dir($source."/".$file) == true) { 
                    if(is_dir($res."/".$file)!=true) // существует ли папка 
                        mkdir($res."/".$file, 0777); // создаю папку 
                        copy_files ($source."/".$file, $res."/".$file); 
                } 
                else{ 
                    if(!copy($source."/".$file, $res."/".$file)) {  
                        print ("при копировании файла $file произошла ошибка...<br>\n");  
                    }// end if copy 
                }  
            } // else $file == .. 
        } // end while 
        closedir($hendle); 
    }
    function removeDirRec($dir){    
        if ($objs = glob($dir."/*")) {
            foreach($objs as $obj) {
               is_dir($obj) ? removeDirRec($obj) : unlink($obj);
            }
        }
        rmdir($dir);
    }


    if($tip == "copy") {//Создание нового проекта       
        $dir = $_REQUEST['dir'];
        $dirWith = $_REQUEST['dirWith'];
        
        copy($dirWith, $dir);
        echo "okRm";    
        return;
    }

    if($tip == "copyDir") {//Создание нового проекта        
        $dir = $_REQUEST['dir'];
        $dirWith = $_REQUEST['dirWith'];
        
        copy_files($dirWith, $dir);
        echo "okRm";    
        return;
    }



    if($tip == "removeDirRec") {//Создание нового проекта       
        $dir = $_REQUEST['dir'];        
        removeDirRec($dir);     
        echo "removeDirRec=".$dir;  
        return;
    }

    function getDirs($dir){
        //cleanerDir($dir."/");
        $str='[';
        $s='';
        $s1='';
        $b=0;
        $b4=0;
        $eee='';
        if ($objs = glob($dir."/*")) {
            $objsSort = array_combine($objs, array_map("filemtime", $objs));
            krsort($objsSort);
            unset($objs);
            foreach ($objsSort as $key => $value) {
                $objs[] = $key;
            }
            foreach($objs as $obj) {
                $b4=0;
                $b=0;
                $s=basename($obj);
                $length=strlen($s);  
                $eee=substr($s, $length-2);             
                if($eee=="js"){                 
                    $b=1;
                    $s=substr($s,0,$length-3);
                }

                $s1='';             
                if(is_dir($obj."/")){
                    $s1=getDirs($obj);
                    $b=1;
                    $b4=1;
                }
                if($b==1){
                    $str=$str.'{"idUnik":"'.$s.'",';
                    $str=$str.'"tip":'.$b4.',';
                    if($b4==1)
                        $str=$str.'"arrObj":'."[".$s1;
                    else
                        $str=$str.'"arrObj":[]';
                        
                    $str=$str.'},';             
                }
            }
        }
        $lll=strlen($str);
        $str=substr($str, 0, $lll-1);   
        $str=$str.']';
        unset($objs, $objsSort);
        return $str;
    }



    if($tip == "getFiles"){     
        $ff = getDirs($_REQUEST['dir']);
        $ff = '{"idUnik":"'.$_REQUEST['dir'].'", "arrObj":'.$ff.'}';        
        echo $ff;//$ff; 
        return;        
    }




    function getDirs1($dir,$sah, $arrNot){
        //cleanerDir($dir."/");
        
        $str='[';
        
        if ($objs = glob($dir."/*")) {
            $objsSort = array_combine($objs, array_map("filemtime", $objs));
            krsort($objsSort);
            unset($objs);
            foreach ($objsSort as $key => $value) {
                $objs[] = $key;
            }
            $b=0;
            foreach($objs as $obj) {
                $bbb=1;
                $b4=0;
                $b=$b+1;
                $s=basename($obj);

                

                
                if($b!=1)$str=$str.','; 

                if(is_dir($obj."/")){
                    if(isset($arrNot)){
                        $cc=count($arrNot);
                        for ($i = 0; $i <= $cc; $i++) {
                            
                            if($arrNot[$i]==$s){
                                $bbb=0;

                            };
                        };
                    };

                    if($bbb==1){
                        $str=$str.'{"'.$s.'":[]'.'}';
                    }else{
                       // $str=$str.'{"'.$s.'":["ERROR Load Big"]}';
                    }


                }else{
                   $str=$str.'"'.$s.'"'; 
                }                
            }
        }
       
        $str=$str.']';
        unset($objs, $objsSort);
        return $str;
    }




    if($tip == "getFiles1"){
        $ff = getDirs1($_REQUEST['dir'],0,$_REQUEST['arrNot']);        
        echo $ff;//$ff; 
        return;        
    }









    function getFilesSize($path){
        $fileSize = 0;

        if(is_dir($path)==false){
            $fileSize += filesize($path);
            return $fileSize;
        }

        $dir = scandir($path);

        

        foreach($dir as $file)
        {
            if (($file!='.') && ($file!='..'))
                if(is_dir($path . '/' . $file))
                    $fileSize += getFilesSize($path.'/'.$file);
                else
                    $fileSize += filesize($path . '/' . $file);
        }
        return $fileSize;
    }



    /*function getDirsSize($dir){
        //cleanerDir($dir."/");
        $str='[';
        $s='';
        $s1='';
        $b=0;
        $b4=0;
        $eee='';
        if ($objs = glob($dir."/*")) {
            $objsSort = array_combine($objs, array_map("filemtime", $objs));
            krsort($objsSort);
            unset($objs);
            foreach ($objsSort as $key => $value) {
                $objs[] = $key;
            }
            foreach($objs as $obj) {
                $b4=0;
                $b=0;
                $s=basename($obj);
                $length=strlen($s);  
                $eee=substr($s, $length-2);             
                if($eee=="js"){                 
                    $b=1;
                    $s=substr($s,0,$length-3);
                }

                $s1='';             
                if(is_dir($obj."/")){
                    $s1=getDirs($obj);
                    $b=1;
                    $b4=1;
                }
                if($b==1){
                    $str=$str.'{"idUnik":"'.$s.'",';
                    $str=$str.'"tip":'.$b4.',';
                    if($b4==1)
                        $str=$str.'"arrObj":'."[".$s1;
                    else
                        $str=$str.'"arrObj":[]';
                        
                    $str=$str.'},';             
                }
            }
        }
        $lll=strlen($str);
        $str=substr($str, 0, $lll-1);   
        $str=$str.']';
        unset($objs, $objsSort);
        return $str;
    }*/
    
    function getDirsSize($dir){
        //cleanerDir($dir."/");
        

        $str='{';
        $str=$str.'"name":"'.basename($dir).'"';
        $str=$str.',"size":'.getFilesSize($dir.$put);
       // $str=$str.',"dir":"'.$dir.'"';
        
        //////////////////
        $str=$str.',"array":[';
        $bbb=0;

        if ($objs = glob($dir."/*")) {
            $objsSort = array_combine($objs, array_map("filemtime", $objs));
            krsort($objsSort);
            unset($objs);
            foreach ($objsSort as $key => $value) {
                $objs[] = $key;
            }
            foreach($objs as $obj) {
                if($bbb==1)$str=$str.',';
                $bbb=1;
                $s=basename($obj);

                if(is_dir($obj."/")){
                   // $str=$str.$dir.$s.'/'.','; 
                    $str=$str.getDirsSize($dir.$s.'/');
                }else{
                    $str=$str.getDirsSize($dir.$s);
                }

                
               // $length=strlen($s); 
                
            }
        }
        $str=$str.']'; 

        ///////////////////////**/
         
        $str=$str.'}';        
        return $str;
    }


    if($tip == "getFilesSize"){
        $ff = getDirsSize($_REQUEST['dir']);        
        echo $ff;//$ff; 
        return;        
    }






    if($tip == "uploads") {//Создание нового проекта    
        $dir = $_REQUEST['dir'];        
        
        //mkdir($dir);
        //move_uploaded_file($_FILES['file']['tmp_name'],$dir]);// 'uploads/' . $_FILES['file']['name']);


        echo "ok_uploads "+$_REQUEST['dir'];    
        return;
    }



    
    if($tip == "getDiractFiles"){   
        $ff ='';
        if ($objs = glob($_REQUEST['dir']."/*")) {
            foreach($objs as $obj) {
                $s=basename($obj);
                $ff=$ff.','.$s;
            }
        }               
        echo $ff;   
        return;     
    }
    header('Content-Type: text/html; charset=utf-8');
    if($tip == "getText"){   
        

        $handle = fopen($_REQUEST['dir'], "r");
        while (!feof($handle)) {
            $buffer = fgets($handle, 4096);

            echo $buffer;
        }
        fclose($handle);      
        
        return; 
    }



    echo "not"; 
    
?>
