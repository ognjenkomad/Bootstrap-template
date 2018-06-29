<?php

	class form_validator{
		const SANITIZE_STRING_MESSAGE = 'This field is required';
		const MAX_LENGTH_MESSAGE = 'Length of the input field is longer than allowed value';
		const MIN_LENGTH_MESSAGE = 'Length of the input field is shorter than allowed value';
        const VALIDATE_EMAIL_MESSAGE = 'E-mail address is not valid.';
		
		protected $filter_string;
		protected $techincal_errors;
		protected $current_error;
		protected $all_errors;
		
		protected function set_error($error, &$value, $filter_value = ''){
			if(empty($filter_value)){
				$this->current_error = $error;
				$this->all_errors[] = $error;
			} else{
				$this->current_error = $error . ": $filter_value";
				$this->all_errors[] = $error . ": $filter_value";
			}
			$value = false;
		}
		
		public function __construct(){
			$this->filter_string = '';
			$this->technical_errors = array();
			$this->current_error = '';
			$this->all_errors = array();
		}
		
		public function validate_element(&$value, $options){	//This functions apply filters specified in $options parameter either as string or array
			$this->current_error = '';
			if(is_array($options)){
				$this->filter_string = implode(' ', $options);
			} else{
				$this->filter_string = (string)$options;
			}
			$filters = array();
			$filters = preg_split('/[\s,]+/', trim($this->filter_string));
			$n = count($filters);
			for($i=0; $i<$n; $i++){
				$equal_sign = strpos($filters[$i], '=');
				if($equal_sign !== false){
					$sub_string = substr($filters[$i], 0, $equal_sign);
				} else{
					$sub_string = $filters[$i];
				}
				if($value !== false){
					switch(strtolower($sub_string)){
						case 'sanitize':							
							$sanitized_value = filter_var(trim($value), FILTER_SANITIZE_STRING);
							if(strcmp($sanitized_value, trim($value)) !== 0 || empty($sanitized_value)){
								$this->set_error(self::SANITIZE_STRING_MESSAGE, $value);
							}						
							break;
						case 'max_length':							
							$filter_value = substr($filters[$i], $equal_sign+1);
							if(is_numeric($filter_value)){
								if(mb_strlen(trim($value), "UTF-8") > ($filter_value+1)){
									$this->set_error(self::MAX_LENGTH_MESSAGE, $value, $filter_value);
								}
							} else{
								$this->technical_errors[] = 'Wrong value specified for the filter: "' . "{$filters[$i]}" . '"';
								$value = false;
							}			
							break;
						case 'min_length':							
							$filter_value = substr($filters[$i], $equal_sign+1);
							if(is_numeric($filter_value)){
								if(mb_strlen(trim($value), "UTF-8") < ($filter_value+1)){
									$this->set_error(self::MIN_LENGTH_MESSAGE, $value, $filter_value);
								}
							} else{
								$this->technical_errors[] = 'Wrong value specified for the filter: "' . "{$filters[$i]}" . '"';
								$value = false;
							}
							break;
                        case 'email':
                            $sanitized_value = filter_var(trim($value), FILTER_VALIDATE_EMAIL);
							if(strcmp($sanitized_value, trim($value)) !== 0 || empty($sanitized_value)){
								$this->set_error(self::VALIDATE_EMAIL_MESSAGE, $value);
							}						
							break;
						default:
							$this->technical_errors[] = 'Wrong filter specified: "' . "{$filters[$i]}" . '"';
							break;
					}
				}
			}	
			return $value;	
		}
		
		public function get_error(){
			return $this->current_error;
		}
		
		public function get_errors(){
			return $this->all_errors;
		}
		
		public function get_tech_errors(){
			return $this->technical_errors;
		}
		
	}