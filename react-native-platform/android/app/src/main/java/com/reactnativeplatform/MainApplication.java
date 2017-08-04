package com.reactnativeplatform;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
//import com.syarul.rnlocation.RNLocation;
//import me.ele.dodo.AMapLocationReactPackage;

//import com.reactnativecomponent.amaplocation.RCTAMapLocationPackage;    //import package
//import com.reactnativecomponent.amap.RCTAMapPackage;
import org.lovebing.reactnative.baidumap.BaiduMapPackage;
import com.reactnative.photoview.PhotoViewPackage;
import com.theweflex.react.WeChatPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFetchBlobPackage(),
            new RCTCameraPackage(),
          new SplashScreenReactPackage(),
          //new RNLocation(),
          //new AMapLocationReactPackage(),
          //new RCTAMapLocationPackage(),  //register Module
          //new RCTAMapPackage(),  //register Module
          new BaiduMapPackage(getApplicationContext()),
          new PhotoViewPackage(), // add this manager
          new WeChatPackage()        // Add this line
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
