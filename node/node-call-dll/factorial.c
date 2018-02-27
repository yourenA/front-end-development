#include <stdint.h>

#if defined(WIN32) || defined(_WIN32)
#define EXPORT __declspec(dllexport)
#else
#define EXPORT
#endif

EXPORT uint64_t factorial(int max) {
  int i = max;
  uint64_t result = 1;

  while (i >= 2) {
    result *= i--;
  }

  return result;
}

EXPORT int add(int first,int second) {
  int result = first+second;
  return result;
}

EXPORT int minus(int first,int second) {
  int result = first-second;
  return result;
}

EXPORT int multiply(int first,int second) {
  int result = first*second;
  return result;
}

EXPORT const char * compare(int first,int second) {
  const char *result;
  if(first - second < 0 ){
    result = "小于";
  }else if(first - second > 0){
    result = "大于";
  }else{
    result = "等于";
  }
  return result;
}

