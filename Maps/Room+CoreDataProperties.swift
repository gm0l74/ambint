//
//  Room+CoreDataProperties.swift
//  Maps
//
//  Created by João Saraiva on 16/05/2021.
//  Copyright © 2021 scenee. All rights reserved.
//
//

import Foundation
import CoreData


extension Room {

    @nonobjc public class func fetchRequest() -> NSFetchRequest<Room> {
        return NSFetchRequest<Room>(entityName: "Room")
    }

    @NSManaged public var name: String?
    @NSManaged public var occupation: NSDecimalNumber?
    @NSManaged public var building: Building?

}

extension Room : Identifiable {

}
