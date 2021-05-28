// Copyright 2018 the FloatingPanel authors. All rights reserved. MIT license.

import UIKit
import CoreData

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    var window: UIWindow?
    
    lazy var persistentContainer: NSPersistentContainer = {
        let container = NSPersistentContainer(name: "Model")
        container.loadPersistentStores { description, error in
            if let error = error {
                fatalError("Unable to load persistent stores: \(error)")
            }
        }
        if container != nil{
            print("Found Data Model Container")
        }
        else { // nil
            print("Did not found Data Model Container")
        }
        return container
    }()

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        if let rootVC = window?.rootViewController as? ViewController {
            rootVC.container = persistentContainer
        }
        
        return true
    }
}

