//
//  RoomMapViewController.swift
//  Maps
//
//  Created by João Saraiva on 01/04/2021.
//  Copyright © 2021 scenee. All rights reserved.
//

import UIKit

class RoomMapViewController: UIViewController {

    @IBOutlet private weak var displayView: UIView!
    public var index: Int?
    @IBOutlet weak var floorNameLabel: UILabel!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setFloorName(name: "Sala Teste")
    }
    
    override func viewDidLayoutSubviews() {
        
    }
    
    public func setFloorName(name: String) {
        if !isViewLoaded {
            _ = self.view
        }
        floorNameLabel.text = name
    }
    
    public func setFloorMap(floorViewController: UIViewController) {
        if !isViewLoaded {
            _ = self.view
        }
        
        
        displayView.addSubview(floorViewController.view)
        
        let views: [String: Any] = ["pageView": floorViewController.view]
        
        displayView.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "H:|-0-[pageView]-0-|", options: NSLayoutConstraint.FormatOptions(rawValue: 0), metrics: nil, views: views))
        
        displayView.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "V:|-0-[pageView]-0-|", options: NSLayoutConstraint.FormatOptions(rawValue: 0), metrics: nil, views: views))
        
    }
    

}
